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
    abstract member IsMine  : bool   with get
    abstract member Pos     : Point  with get
    abstract member Size    : int16  with get
    abstract member Color   : Color  with get
    abstract member IsVirus : bool   with get
    abstract member Name    : string with get

type IBalls =
    abstract member All : seq<IBall> with get
    abstract member My  : seq<IBall> with get

type Ball(isMine : bool) =
    member val IsMine  = isMine
    member val Pos     = new Point() with get, set
    member val Size    = new int16() with get, set
    member val Color   = new Color() with get, set
    member val IsVirus = new bool()  with get, set
    member val Name    = ""          with get, set

    interface IBall with
        member x.IsMine  = x.IsMine    
        member x.Pos     = x.Pos    
        member x.Size    = x.Size   
        member x.Color   = x.Color  
        member x.IsVirus = x.IsVirus
        member x.Name    = x.Name   

open CentralServer

type GameState() =
    member val All = new Dictionary<uint32, Ball>();
    member val My = new HashSet<Ball>();
    
    member x.Update(eatings : Eating[], updates: BallUpdate[], deletes: BallId[]) =
        let appears = new List<IBall>()
        let eats = new List<IBall*IBall>()
        let removes = new List<IBall>()
        for e in eatings do
            let (ok, eaterFound) = x.All.TryGetValue(e.Eater)
            let eater = if ok then eaterFound else
                            let created = new Ball(false)
                            x.All.Add(e.Eater, created)
                            appears.Add(created)
                            created

            let (ok, eaten) = x.All.TryGetValue(e.Eaten)
            if ok then 
                eats.Add((eater :> IBall, eaten :> IBall))
                x.All.Remove(e.Eaten) |> ignore
                if eaten.IsMine then x.My.Remove(eaten) |> ignore
                removes.Add(eaten) |> ignore

        for u in updates do
            let (ok, newGuyFound) = x.All.TryGetValue(u.Id)
            let newGuy = if ok then newGuyFound else
                            let created = new Ball(false)
                            x.All.Add(u.Id, created)
                            appears.Add(created)
                            created
    
            newGuy.Pos <- u.Pos;
            newGuy.Size <- u.Size;
            newGuy.Color <- u.Color;
            newGuy.IsVirus <- u.IsVirus;
            if not (String.IsNullOrEmpty u.Name) then
                newGuy.Name <- u.Name;

        for r in deletes do
            let (ok, dying) = x.All.TryGetValue(r)
            if ok then
                x.All.Remove(r) |> ignore
                if dying.IsMine then x.My.Remove(dying) |> ignore
                removes.Add(dying)

        (appears, eats, removes)

    member x.CreateMe(id: BallId) =
        let me = new Ball(true);
        x.All.Add(id, me) |> ignore
        x.My.Add(me) |> ignore
        me

    member x.DestroyAll() =
        let result = x.All.Values |> Seq.toArray
        x.All.Clear |> ignore
        x.My.Clear |> ignore

    interface IBalls with
        member x.All = x.All.Values |> Seq.cast
        member x.My = x.My |> Seq.cast

