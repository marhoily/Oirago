module MainApp

open System
open System.Windows
open System.Windows.Controls
open System.Windows.Markup

type MainWindow = FsXaml.XAML<"MainWindow.xaml", true>
let window = new MainWindow()

[<STAThread>]
[<EntryPoint>]
let main(_) = (new Application()).Run(window.Root)