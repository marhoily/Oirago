module MainApp

open System
open System.Windows
open System.Windows.Controls
open System.Windows.Markup
open System.Windows.Input

type MainWindow = FsXaml.XAML<"MainWindow.xaml", true>
type GameControl = FsXaml.XAML<"Ui/GameControl.xaml", true>
let window = new MainWindow()
window.Root.KeyDown.Add(fun e -> 
    if e.Key = Key.F11 then
        if window.Root.WindowStyle <> WindowStyle.None then
            window.Root.WindowStyle <- WindowStyle.None
            window.Root.WindowState <- WindowState.Maximized
        else
            window.Root.WindowState <- WindowState.Normal
            window.Root.WindowStyle <- WindowStyle.SingleBorderWindow)

//let gameControl = new GameControl()
//window.GameControlPlace.Content <- gameControl.Root

let app = new Application()

[<STAThread; EntryPoint>]
let main(_) = app.Run(window.Root)