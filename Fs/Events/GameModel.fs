module GameModel

open CentralServer
open System.Collections.Generic
open System.Windows

type Ball = 
    { IsMine : bool
      Data : BallData
      Name : string }
    member ball.Id = ball.Data.Id
    member ball.Pos = ball.Data.Pos
    member ball.Size = ball.Data.Size
    member ball.Color = ball.Data.Color
    member ball.IsVirus = ball.Data.IsVirus
    member ball.IsFood = ball.Data.Size < 30s

type MetaBall = 
    | Real of Ball
    | Header of bool

type IBalls = 
    abstract All : seq<Ball>
    abstract My : seq<Ball>

type GameEvent = 
    | Appears of Ball
    | Eats of Ball * Ball
    | Removes of Ball
    | AfterTick of IBalls
    | ViewPort of Rect
    | Leaders of string []
    | Error of string

type GameState() = 
    member val All = new Dictionary<uint32, MetaBall>()
    
    member x.Update(eatings : Eating [], updates : BallUpdate [], 
                    deletes : BallId []) = 
        let gameEvents = new List<GameEvent>()
        for e in eatings do
            let (ok, eaterFound) = x.All.TryGetValue(e.Eater)
            
            let eater = 
                if ok then eaterFound
                else 
                    let created = Header false
                    x.All.Add(e.Eater, created)
                    created
            match x.All.TryGetValue(e.Eaten) with
            | true, Real eaten -> 
                match eater with
                | Real eater -> gameEvents.Add(Eats(eater, eaten))
                | _ -> ()
                x.All.Remove(e.Eaten) |> ignore
                gameEvents.Add(Removes eaten) |> ignore
            | _ -> ()
        for (ballData, ballName) in updates do
            let id = ballData.Id
            let (ok, newGuyFound) = x.All.TryGetValue(id)
            
            let newGuy = 
                if ok then newGuyFound
                else 
                    let created = Header false
                    x.All.Add(id, created)
                    created
            
            let ball, shouldNotify = 
                match x.All.TryGetValue(id) with
                | true, Real ball -> 
                    ({ ball with Data = ballData }, false)
                | true, Header isMine -> 
                    ({ IsMine = isMine
                       Data = ballData
                       Name = ballName }, true)
                | false, _ -> 
                    ({ IsMine = false
                       Data = ballData
                       Name = ballName }, true)
            
            x.All.[id] <- Real ball
            if not shouldNotify then gameEvents.Add(Appears ball)
        for deletedId in deletes do
            match x.All.TryGetValue(deletedId) with
            | true, Real dying -> 
                x.All.Remove(deletedId) |> ignore
                gameEvents.Add(Removes dying) |> ignore
            | true, Header _ -> x.All.Remove(deletedId) |> ignore
            | false, _ -> ()
        gameEvents :> seq<_>
    
    member x.CreateMe(id : BallId) = 
        x.All.Add(id, Header true) |> ignore
    
    member x.DestroyAll() = 
        let onlyReal = 
            function 
            | Real ball -> Some(Removes ball)
            | _ -> None
        
        let result = x.All.Values |> Seq.choose onlyReal
        x.All.Clear |> ignore
        result
    
    interface IBalls with
        
        member x.All = 
            x.All.Values |> Seq.choose (function 
                                | Real ball -> Some ball
                                | _ -> None)
        
        member x.My = 
            x.All.Values |> Seq.choose (function 
                                | Real ball when ball.IsMine -> 
                                    Some ball
                                | _ -> None)

let dispatch (gameState : GameState) = 
    function 
    | UpdateBalls(e, u, d) -> gameState.Update(e, u, d)
    | NewId(ballId) -> 
        gameState.CreateMe(ballId)
        Seq.empty
    | DestroyAllBalls -> gameState.DestroyAll()
    | UpdateViewPort r -> seq { yield ViewPort r }
    | UpdateLeaders l -> seq { yield Leaders(l |> Array.map snd) }
    | Unknown id -> 
        seq { yield Error(sprintf "Unknown packet id %d" id) }
    // not now
    | UpdateCamera _ -> Seq.empty
    // just ignore
    | DestroyAllBalls | DestroyLessStuff | TeamUpdate | SetSomeVariables | NoIdea | ExperienceUpdate | Forward | LogOut | GameOver -> 
        Seq.empty
