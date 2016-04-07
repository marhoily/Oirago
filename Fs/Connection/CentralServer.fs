module CentralServer

open Nito.AsyncEx
open System
open System.IO
open System.Net
open System.Text
open System.Windows
open System.Windows.Media
open WebSocketSharp

let private initKey = "154669603"

let private readCredentials (dataStream : Stream) = 
    match dataStream with
    | null -> None
    | _ -> 
        let reader = new StreamReader(dataStream)
        Some(reader.ReadLine(), reader.ReadLine())

let private credentialsFromResponse log (resp : HttpWebResponse) = 
    log resp.StatusDescription
    match resp.StatusCode with
    | HttpStatusCode.OK -> 
        using (resp.GetResponseStream()) readCredentials
    | _ -> None

let private writeArray (byteArray : byte []) (dataStream : Stream) = 
    dataStream.Write(byteArray, 0, byteArray.Length)

type private WebRequest with
    
    member request.WriteContent(postData : string) = 
        request.ContentType <- "application/x-www-form-urlencoded"
        let content = Encoding.UTF8.GetBytes(postData)
        request.ContentLength <- content.LongLength
        using (request.GetRequestStream()) (writeArray content)
    
    member request.GetHttpResponseAsync() = 
        async { let! response = request.GetResponseAsync() 
                                |> Async.AwaitTask
                return response :?> HttpWebResponse }

let private requestTo (url : string) = 
    WebRequest.Create(url) :?> HttpWebRequest

let private getServer content log = 
    let request = requestTo "http://m.agar.io/"
    request.Method <- "POST"
    request.Headers.Add("Origin", "http://agar.io")
    request.Referer <- "http://agar.io"
    request.WriteContent(content)
    async { let! response = request.GetHttpResponseAsync()
            return using (response) (credentialsFromResponse log) }

let GetFfaServer = getServer ("EU-London" + "\n" + initKey)
let GetExperimentalServer = 
    getServer ("EU-London" + ":experimental\n" + initKey)
let GetTeamsServer = getServer ("EU-London" + ":teams\n" + initKey)

let Connect (server, key : string) log = 
    log "opening..."
    let webSocket = new WebSocket("ws://" + server)
    webSocket.Origin <- "http://agar.io"
    let onOpen _ = 
        log ""
        webSocket.Send 
            [| 254uy; 5uy; 255uy; 35uy; 18uy; 56uy; 9uy; 80uy |]
        webSocket.Send(Encoding.ASCII.GetBytes key)
    
    let onError (e : ErrorEventArgs) = log e.Message
    
    let onClose _ = 
        let mutable delay = 1000 // milliseconds
        
        let reconnect = 
            async { 
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
    | MoveTo of double * double

let CommandsSink(webSocket : WebSocket) = 
    function 
    | Spawn(name) -> 
        webSocket.Send [| yield 0uy
                          yield! (Encoding.Unicode.GetBytes name) |]
    | Spectate -> webSocket.Send [| 1uy |]
    | Split -> webSocket.Send [| 17uy |]
    | Eject -> webSocket.Send [| 21uy |]
    | MoveTo(x, y) -> 
        webSocket.Send [| yield 16uy
                          yield! (BitConverter.GetBytes(int (x)))
                          yield! (BitConverter.GetBytes(int (y))) |]

type private BinaryReader with
    
    member x.ReadUnicodeString() = 
        let sb = new StringBuilder()
        let mutable ch = x.ReadUInt16()
        while ch <> 0us do
            sb.Append(char (ch)) |> ignore
            ch <- x.ReadUInt16()
        sb.ToString()
    
    member x.ReadAsciiString() = 
        let sb = new StringBuilder()
        let mutable ch = x.ReadByte()
        while ch <> 0uy do
            sb.Append(char (ch)) |> ignore
            ch <- x.ReadByte()
        sb.ToString()

let private seek (reader : BinaryReader) pos = 
    reader.BaseStream.Seek(int64 (pos), SeekOrigin.Current) |> ignore

type BallId = uint32

type Eating = 
    { Eater : BallId
      Eaten : BallId }

let private readEatings (reader : BinaryReader) = 
    let count = reader.ReadUInt16()
    [| for _ in 0..int (count) -> 
           { Eater = reader.ReadUInt32()
             Eaten = reader.ReadUInt32() } |]

let private readOptions (reader : BinaryReader) = 
    let opt = reader.ReadByte()
    if (opt &&& 2uy) <> 0uy then seek reader (reader.ReadUInt32())
    if (opt &&& 4uy) <> 0uy then reader.ReadAsciiString() |> ignore
    let isVirus = (opt &&& 1uy) <> 0uy
    isVirus

let private readPoint (reader : BinaryReader) = 
    let x = reader.ReadInt32()
    let y = reader.ReadInt32()
    new Point(float (x), float (y))

let private readColor (reader : BinaryReader) = 
    let r = reader.ReadByte()
    let g = reader.ReadByte()
    let b = reader.ReadByte()
    Color.FromRgb(r, g, b)

type BallData = 
    { Id : BallId
      Pos : Point
      Size : int16
      Color : Color
      IsVirus : bool }

let private ballData (reader : BinaryReader) ballId = 
    { Id = ballId
      Pos = readPoint reader
      Size = reader.ReadInt16()
      Color = readColor reader
      IsVirus = readOptions reader }

let private ballUpdate (reader : BinaryReader) ballId = 
    let ballName() = reader.ReadUnicodeString()
    (ballData reader ballId, ballName())

let rec private readUpdates (reader : BinaryReader) = 
    [| let ballId = reader.ReadUInt32()
       if ballId <> 0u then 
           yield ballUpdate reader ballId
           yield! readUpdates reader |]

let private readDisappearances (reader : BinaryReader) = 
    let count = reader.ReadUInt32()
    [| for _ in 0..int (count) -> reader.ReadUInt32() |]

let private readTick (reader : BinaryReader) = 
    let e = readEatings reader
    let u = readUpdates reader
    let d = readDisappearances reader
    (e, u, d)

let private readCamera (reader : BinaryReader) = 
    let x = reader.ReadSingle()
    let y = reader.ReadSingle()
    let zoom = reader.ReadSingle()
    (x, y, zoom)

let private readLeaders (reader : BinaryReader) = 
    [| for _ in 0..int (reader.ReadUInt32()) do
           let id = reader.ReadUInt32()
           let name = reader.ReadUnicodeString()
           yield (id, name) |]

let private readViewPort (reader : BinaryReader) = 
    let (minX, minY) = (reader.ReadDouble(), reader.ReadDouble())
    let (maxX, maxY) = (reader.ReadDouble(), reader.ReadDouble())
    new Rect(maxX, maxY, minX - maxX, minY - maxY)

type BallUpdate = BallData * string

type ServerEvent = 
    | UpdateBalls of Eating [] * BallUpdate [] * BallId []
    | UpdateCamera of float32 * float32 * float32
    | NewId of BallId
    | UpdateViewPort of Rect
    | UpdateLeaders of (uint32 * string) []
    | Unknown of byte
    // these I don't understand yet
    | DestroyAllBalls
    | DestroyLessStuff
    | SetSomeVariables
    | TeamUpdate
    | NoIdea
    | ExperienceUpdate
    | Forward
    | LogOut
    | GameOver

let private readMessage (reader : BinaryReader) = 
    match reader.ReadByte() with
    | 16uy -> UpdateBalls(readTick reader)
    | 17uy -> UpdateCamera(readCamera reader)
    | 18uy -> DestroyAllBalls
    | 20uy -> DestroyLessStuff
    | 21uy -> SetSomeVariables
    | 49uy -> UpdateLeaders(readLeaders reader)
    | 32uy -> NewId(reader.ReadUInt32())
    | 50uy -> TeamUpdate
    | 64uy -> UpdateViewPort(readViewPort reader)
    | 72uy -> NoIdea
    | 81uy -> ExperienceUpdate
    | 102uy -> Forward
    | 104uy -> LogOut
    | 240uy -> NoIdea
    | 254uy -> GameOver
    | id -> Unknown id

let private readMessageFromBuffer (buffer : byte []) = 
    let reader = new BinaryReader(new MemoryStream(buffer))
    readMessage reader

let EventsFeed (webSocket : WebSocket) record = 
    let events = new AsyncCollection<ServerEvent>()
    webSocket.OnMessage.Add(fun e -> 
        record e.RawData
        events.Add(readMessageFromBuffer e.RawData))
    let result : unit -> Async<ServerEvent> = 
        events.TakeAsync >> Async.AwaitTask
    result
