module Commands

open System
open System.Text
open WebSocketSharp

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

