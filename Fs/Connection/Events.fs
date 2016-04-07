module Events

open Nito.AsyncEx
open System.IO
open System.Text
open System.Windows
open System.Windows.Media
open WebSocketSharp

type BallId = uint32

type Eating = 
    { Eater : BallId
      Eaten : BallId }

type BallData = 
    { Id : BallId
      Pos : Point
      Size : int16
      Color : Color
      IsVirus : bool }

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
