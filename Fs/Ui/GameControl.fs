module GameControl

open System.Collections.Generic
open CentralServer
open GameModel
open Ui
open System.Windows
open System.Windows.Input
open System.Windows.Media

type Control = FsXaml.XAML<"Ui/GameControl.xaml", true>
type private IBalls with
    member x.MyAverage() = new Point()
    member x.Zoom() = 0.0
    member x.Zoom04() = 0.0

let create nextEvent sendCommand log =
    let mutable _zoom = 5.0
    let _map = new Dictionary<BallId, BallUi>()
    let _hidden = new Stack<BallUi>()
    let _control = new Control()
    let mutable _worldBoundaries = new Rect()
    let translate = _control.TranslateTransform :?> TranslateTransform

    let LeadBalls (me : Point) z =
        let position = Mouse.GetPosition(_control.Root)
        let sdx = position.X - _control.Root.ActualWidth / 2.0
        let sdy = position.Y - _control.Root.ActualHeight / 2.0
        if sdx * sdx + sdy * sdy > 64.0 then 
            sendCommand(MoveTo(sdx / z + me.X, sdy / z + me.Y))

    let UpdateCenter (myAverage : Point) = 
        let x = _control.ActualWidth / 2.0 - myAverage.X
        let y = _control.ActualHeight / 2.0 - myAverage.Y
        translate.X <- (translate.X + x) / 2.0
        translate.Y <- (translate.Y + y) / 2.0
    
    let UpdateScale balls =
        ()

    async {
        let! e = nextEvent()
        match e with
        | Appears newGuy ->
            _map.[newGuy.Id] <- 
                if _hidden.Count = 0 then
                    let ballUi = new BallUi()
                    _control.MainCanvas.Children.Add(ballUi.Ellipse) |> ignore
                    _control.MainCanvas.Children.Add(ballUi.TextBlock) |> ignore
                    ballUi
                else
                    let ballUi = _hidden.Pop()
                    ballUi.Show()
                    ballUi
        | Eats _ -> ()
        | Removes dying ->
            let ballUi = _map.[dying.Id]
            _map.Remove(dying.Id) |> ignore
            ballUi.Hide()
            _hidden.Push(ballUi)
        | AfterTick balls -> 
            if balls.My |> Seq.isEmpty then
                _worldBoundaries <- Rect.Empty
                sendCommand (Spawn "blah")
            else
                let myAverage = balls.MyAverage()
                LeadBalls myAverage (balls.Zoom04())
                UpdateCenter myAverage
                UpdateScale balls
                let mutable zIndex = 0
                let bySize = balls.All |> Seq.sortBy(fun b -> b.Size)
                let mySize = balls.My |> Seq.map(fun b -> float(b.Size)) |> Seq.max
                for ball in bySize do
                    zIndex <- zIndex + 1
                    let ui = _map.[ball.Id]
                    ui.Update(ball, zIndex, mySize)
    }
    


