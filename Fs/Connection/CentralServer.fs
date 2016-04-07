module CentralServer

open System.IO
open System.Net
open System.Text
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

let BeginConnecting (server, key : string) log = 
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

