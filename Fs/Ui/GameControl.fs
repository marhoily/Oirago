module GameControl

open System.Collections.Generic
open CentralServer
open GameModel
open Ui

type Control = FsXaml.XAML<"Ui/GameControl.xaml", true>

let create nextEvent sendCommand log =
    let mutable _zoom = 5.0;
    let _map = new Dictionary<BallId, BallUi>();
    let _hidden = new Stack<BallUi>();
    let _control = new Control();
    
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
    }
    


