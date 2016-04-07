module Ui

open System;
open System.Windows
open System.Text
open System.Windows.Media
open System.Windows.Shapes
open System.Windows.Controls;

open GameModel;

type private Color with
    member c.GetDarker() = Color.FromRgb(byte(c.R/2uy), byte(c.G/2uy), byte(c.B/2uy))
    member t.IsDark() = float(t.R)*0.2126 + float(t.G)*0.7152 + float(t.B)*0.0722 < float(128*3);

type private FrameworkElement with
    member e.CenterOnCanvas(v : Vector) =
        Canvas.SetLeft(e, v.X - e.ActualWidth/2.0)
        Canvas.SetTop(e, v.Y - e.ActualHeight/2.0)

    member e.PlaceOnCanvas(r : Rect) =
        Canvas.SetLeft(e, r.Left)
        Canvas.SetTop(e, r.Top)
        e.Width <- r.Width
        e.Height <- r.Height

type BallUi() =
    let _fillBrush =  new SolidColorBrush()
    let _strokeBrush = new SolidColorBrush()
    let mutable _elasticPos = new Vector(Double.NaN, Double.NaN)
    let mutable _prevColor = new Color()
    let mutable _prevSize = new int16()
    let mutable _prevZIndex = new int()
    let mutable _prevPos = new Point()

    member __.Ellipse = 
        new Ellipse(Fill = _fillBrush, Stroke = _strokeBrush)
    member __.TextBlock = 
        new TextBlock(
            FontSize = 40.0,
            Visibility = Visibility.Collapsed,
            TextAlignment = TextAlignment.Center)

    member x.Update(ball : Ball, zIndex: int, mySize: float) =
        if _prevColor <> ball.Color then
            _prevColor <- ball.Color
            let color = 
                if not ball.IsVirus then ball.Color
                else Color.FromArgb(128uy, 0uy, 255uy, 0uy)
            _fillBrush.Color <- color
            _strokeBrush.Color <- 
                if ball.IsVirus then Colors.Red
                else color.GetDarker()
            x.TextBlock.Foreground <- 
                if ball.Color.IsDark() then Brushes.Black 
                else Brushes.White

        if _prevSize <> ball.Size then
            _prevSize <- ball.Size
            let s = Math.Max(20.0, float(ball.Size))
            x.Ellipse.Width  <- s * 2.0
            x.Ellipse.Height <- s * 2.0
            x.Ellipse.StrokeThickness <- Math.Max(2.0, s / 20.0)
            if not ball.IsFood && not ball.IsVirus then
                let sb = new StringBuilder()
                if ball.Name <> null then sb.AppendLine(ball.Name) |> ignore
                if mySize < s * 0.9 then sb.Append('*') |> ignore
                if mySize < s * 0.7 * 0.9 then sb.Append('*') |> ignore
                sb.Append(ball.Size) |> ignore
                if mySize * 0.9 > s then sb.Append('*') |> ignore
                if mySize * 0.7 * 0.9 > s then sb.Append('*') |> ignore
                x.TextBlock.Text <- sb.ToString()
                x.TextBlock.FontSize <- s / 2.0;
                x.TextBlock.Visibility <- Visibility.Visible;

        if _prevPos <> ball.Pos then
            _prevPos <- ball.Pos
            let pos : Vector = ball.Pos |> Point.op_Explicit
            _elasticPos <- 
                if Double.IsNaN(_elasticPos.X) then pos
                else (_elasticPos + pos)/ 2.0

            x.Ellipse.CenterOnCanvas(_elasticPos)
            x.TextBlock.CenterOnCanvas(_elasticPos)               

        if _prevZIndex <> zIndex then
            _prevZIndex <- zIndex
            Panel.SetZIndex(x.Ellipse, zIndex)
            Panel.SetZIndex(x.TextBlock, zIndex)

    member x.Hide() =
        x.Ellipse.Visibility <- Visibility.Collapsed
        x.TextBlock.Visibility <- Visibility.Collapsed
        _elasticPos <- new Vector(Double.NaN, Double.NaN)

    member x.Show() =
        x.Ellipse.Visibility <- Visibility.Visible
