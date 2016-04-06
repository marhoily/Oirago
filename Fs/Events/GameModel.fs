module GameModel

open System;
open System.Windows
open System.Windows.Data
open System.Net
open System.Text
open System.IO
open System.Linq
open System.Collections.Generic
open WebSocketSharp
open System.Threading.Tasks
open Nito.AsyncEx
open System.Windows.Media

type IBall =
    abstract member IsMine  : bool    with get
    abstract member Pos     : Point   with get
    abstract member Size    : uint32  with get
    abstract member Color   : Color   with get
    abstract member IsVirus : bool    with get
    abstract member Name    : string  with get

type IBalls =
    abstract member All : seq<IBall> with get
    abstract member My  : seq<IBall> with get

type Ball(isMine : bool) =
    member val IsMine  = isMine
    member val Pos     = new Point()
    member val Size    = new uint32()
    member val Color   = new Color()
    member val IsVirus = new bool()
    member val Name    = ""

    interface IBall with
        member x.IsMine  = x.IsMine    
        member x.Pos     = x.Pos    
        member x.Size    = x.Size   
        member x.Color   = x.Color  
        member x.IsVirus = x.IsVirus
        member x.Name    = x.Name   

type GameState() =
    member val All = new Dictionary<uint32, Ball>();
    member val My = new HashSet<Ball>();

    interface IBalls with
        member x.All = x.All.Values |> Seq.cast
        member x.My = x.My |> Seq.cast

open CentralServer
