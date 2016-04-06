module MainApp

open System
open System.Windows
open System.Windows.Controls
open System.Windows.Markup

let window = 
    Application.LoadComponent(
        new Uri("/App;component/mainwindow.xaml", UriKind.Relative)) 
        :?> Window

[<STAThread>]
[<EntryPoint>]
let main(_) = (new Application()).Run(window)