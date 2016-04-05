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

type GameEvent =
    | NoMessage

let EventsFeed (webSocket: WebSocket) record log =
    let events = new AsyncCollection<GameEvent>()
    webSocket.OnMessage.Add(fun e -> 
        record e.RawData
        let p = new BinaryReader(new MemoryStream(e.RawData))
        //let msg = p.ReadMessage()
        //if (msg == null) _log.Error("buffer of length 0");
        //else _events.Add(msg);
        events.Add NoMessage)
    let result : unit -> Async<GameEvent> =
        events.TakeAsync >> Async.AwaitTask
    result
