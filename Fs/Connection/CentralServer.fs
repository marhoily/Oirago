module CentralServer

open System;
open System.Windows
open System.Windows.Data
open System.Net
open System.Text
open System.IO
open WebSocketSharp
open System.Threading.Tasks
open Nito.AsyncEx
open System.Windows.Media

let private InitKey = "154669603";
let private Do (postData : string) log =
    let request = WebRequest.Create("http://m.agar.io/") :?> HttpWebRequest
    request.Method <- "POST";
    request.Headers.Add("Origin", "http://agar.io")
    request.Referer <- "http://agar.io"
    let byteArray = Encoding.UTF8.GetBytes(postData)
    request.ContentType <- "application/x-www-form-urlencoded"
    request.ContentLength <- byteArray.LongLength
    using (request.GetRequestStream()) (fun dataStream ->
        dataStream.Write(byteArray, 0, byteArray.Length))
    async {
        let! r = request.GetResponseAsync() |> Async.AwaitTask
        return using (r) (fun response ->
            let webResponse = response :?> HttpWebResponse
            log webResponse.StatusDescription
            match webResponse.StatusCode with
            | HttpStatusCode.OK ->
                using (response.GetResponseStream()) (fun dataStream ->
                    match dataStream with
                    | null -> None
                    | _ -> using (new StreamReader(dataStream))(fun reader ->
                        Some(reader.ReadLine(), reader.ReadLine())))
            | _ -> None)
    }

let GetFfaServer = Do("EU-London" + "\n" + InitKey)
let GetExperimentalServer = Do("EU-London" + ":experimental\n" + InitKey)
let GetTeamsServer = Do("EU-London" + ":teams\n" + InitKey)

let Connect (server, key : string) recorder log = 
    log "opening..."
    let webSocket = new WebSocket("ws://" + server)
    webSocket.Origin <- "http://agar.io"

    let onOpen _ = 
        log ""
        webSocket.Send [| 254uy; 5uy; 255uy; 35uy; 18uy; 56uy; 9uy; 80uy |]
        webSocket.Send (Encoding.ASCII.GetBytes key)

    let onError (e : ErrorEventArgs) = log e.Message

    let onClose _ = 
        let mutable delay = 1000; // milliseconds
        let reconnect = async {
            do! Async.Sleep delay |> Async.Ignore
            webSocket.Connect()
            delay <- delay * 2
        } 
        reconnect |> Async.RunSynchronously    
        
    webSocket.OnOpen.Add onOpen 
    webSocket.OnError.Add onError
    webSocket.OnClose.Add onClose
    webSocket

type Command = 
    | Spawn of string
    | Spectate
    | Split
    | Eject
    | MoveTo of double*double

let CommandsSink (webSocket: WebSocket) =
    function
    | Spawn(name) ->
        webSocket.Send [| 
            yield 0uy; 
            yield! (Encoding.Unicode.GetBytes name) |]
    | Spectate -> webSocket.Send [| 1uy |]
    | Split -> webSocket.Send [| 17uy |]
    | Eject -> webSocket.Send [| 21uy |]
    | MoveTo(x, y) ->
        webSocket.Send [| 
            yield 16uy; 
            yield! (BitConverter.GetBytes(int(x)));
            yield! (BitConverter.GetBytes(int(y)))|]

type private BinaryReader with
    member x.ReadUnicodeString() = 
        let sb = new StringBuilder();
        let mutable ch = x.ReadUInt16()
        while ch <> 0us do
            sb.Append(char(ch)) |> ignore
            ch <- x.ReadUInt16()
        sb.ToString()

    member x.ReadAsciiString() = 
        let sb = new StringBuilder();
        let mutable ch = x.ReadByte()
        while ch <> 0uy do
            sb.Append(char(ch)) |> ignore
            ch <- x.ReadByte()
        sb.ToString()

type BallId = uint32
type Eating = { Eater:BallId; Eaten:BallId }
type BallUpdate = {
    Id      : BallId;
    Pos     : Point;
    Size    : int16;
    Clr     : Color;
    IsVirus : bool;
    Name    : string;
}
type GameEvent = 
    | UpdateBalls of Eating[] * BallUpdate[] * BallId[]
    | UpdateCamera of float32 * float32 * float32
    | NewId of BallId
    | UpdateViewPort of Rect
    | Leaders of (uint32 * string) []
    | Unknown of byte
    // these I don't understand yet
    | DestroyAllBalls | DestroyLessStuff
    | SetSomeVariables | TeamUpdate
    | NoIdea | ExperienceUpdate | Forward
    | LogOut | GameOver

let EventsFeed (webSocket: WebSocket) record log =
    let readMessage (p : BinaryReader) =
        match p.ReadByte() with
        | 16uy -> 
            UpdateBalls(
                [| for i in 0..int(p.ReadUInt16()) ->
                       {Eater = p.ReadUInt32(); 
                        Eaten = p.ReadUInt32()} |],

                [| let readOpt() = 
                       let opt = p.ReadByte()
                       if (opt &&& 2uy) <> 0uy then p.BaseStream.Seek(int64(p.ReadUInt32()), SeekOrigin.Current) |> ignore
                       if (opt &&& 4uy) <> 0uy then p.ReadAsciiString() |> ignore
                       (opt &&& 1uy) <> 0uy;

                   let mutable ballId = p.ReadUInt32()
                   while ballId <> 0u do
                       yield { Id      = ballId;
                               Pos     = new Point(float(p.ReadInt32()), float(p.ReadInt32()));
                               Size    = p.ReadInt16();
                               Clr     = Color.FromRgb(p.ReadByte(), p.ReadByte(), p.ReadByte());
                               IsVirus = readOpt();
                               Name    = p.ReadUnicodeString() }
                       ballId <- p.ReadUInt32() |],

                [| for i in 0..int(p.ReadUInt32()) -> p.ReadUInt32() |])
        | 17uy -> 
            let x = p.ReadSingle()
            let y = p.ReadSingle()
            let zoom = p.ReadSingle()
            UpdateCamera(x, y, zoom)

        | 18uy -> DestroyAllBalls
        | 20uy -> DestroyLessStuff
        | 21uy -> SetSomeVariables
        | 49uy -> 
            Leaders([| for i in 0..int (p.ReadUInt32()) do
                           let id = p.ReadUInt32()
                           let name = p.ReadUnicodeString()
                           yield (id, name) |])
        | 32uy -> NewId(p.ReadUInt32())
        | 50uy -> TeamUpdate
        | 64uy -> 
            let (minX, minY, maxX, maxY) = (p.ReadDouble(), p.ReadDouble(), p.ReadDouble(), p.ReadDouble())
            UpdateViewPort(new Rect(maxX, maxY, minX - maxX, minY - maxY))
        | 72uy -> NoIdea
        | 81uy -> ExperienceUpdate
        | 102uy -> Forward
        | 104uy -> LogOut
        | 240uy -> NoIdea
        | 254uy -> GameOver
        | id -> Unknown id

    let events = new AsyncCollection<GameEvent>()
    webSocket.OnMessage.Add(fun e -> 
        record e.RawData
        let reader = new BinaryReader(new MemoryStream(e.RawData))
        events.Add(readMessage reader))
    let result : unit -> Async<GameEvent> =
        events.TakeAsync >> Async.AwaitTask
    result
