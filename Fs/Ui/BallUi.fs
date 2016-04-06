module Ui

open System;
open System.Windows
open System.Windows.Data
open System.Net
open System.Text
open System.IO
open System.Linq
open System.Collections.Generic
open System.Threading.Tasks
open System.Windows.Media
open System.Windows.Shapes
open System.Windows.Controls;

open GameModel;

type private Color with
    member c.GetDarker() = Color.FromRgb(byte(c.R/2uy), byte(c.G/2uy), byte(c.B/2uy))
    member t.IsDark() = float(t.R)*0.2126 + float(t.G)*0.7152 + float(t.B)*0.0722 < float(128*3);

type BuildUi() =
    let _fillBrush =  new SolidColorBrush()
    let _strokeBrush = new SolidColorBrush()
    let Ellipse = new Ellipse(Fill = _fillBrush, 
                              Stroke = _strokeBrush)
    let TextBlock = new TextBlock(FontSize = 40.0,
                                  Visibility = Visibility.Collapsed,
                                  TextAlignment = TextAlignment.Center)

    let mutable _elasticPos = new Vector(Double.NaN, Double.NaN)
    let mutable _prevColor = new Color()
    let mutable _prevSize = new int16()
    let mutable _prevZIndex = new int()
    let mutable _prevPos = new Point()

    member x.Update(ball : IBall, zIndex: int, mySize: int16) =
        if _prevColor <> ball.Color then
            _prevColor <- ball.Color
            let color = 
                if not ball.IsVirus then ball.Color
                else Color.FromArgb(128uy, 0uy, 255uy, 0uy)
            _fillBrush.Color <- color
            _strokeBrush.Color <- 
                if ball.IsVirus then Colors.Red
                else color.GetDarker()
            TextBlock.Foreground <- 
                if ball.Color.IsDark() then Brushes.Black 
                else Brushes.White
        if _prevSize <> ball.Size then
            _prevSize <- ball.Size
            let s = Math.Max(20.0, float(ball.Size))
            Ellipse.Width  <- s * 2.0
            Ellipse.Height <- s * 2.0
            Ellipse.StrokeThickness <- Math.Max(2.0, s / 20.0)
            //if not (ball.IsFood()) && not ball.IsVirus then
            //    let mutable st = ball.Size.ToString()
            //    if mySize * 0.9 > s then st <- st + "*"
            //    if mySize * 0.7 * 0.9 > s then st <- st +  "*"
            //    if mySize < s * 0.9 then st <- "*" + st
            //    if mySize < s * 0.7 * 0.9 then st <- "*" + st
            //    TextBlock.Text <- 
            //        if ball.Name = null then st 
            //        else sprintf "%s\r\n%s" ball.Name st
            //    TextBlock.FontSize <- s / 2.0;
//                TextBlock.Visibility = Visibility.Visible;
//            }
//        }
//        if (_prevPos != ball.Pos)
//        {
//            _prevPos = ball.Pos;
//            if (double.IsNaN(_elasticPos.X))
//            {
//                _elasticPos = (Vector)ball.Pos;
//            }
//            else
//            {
//                _elasticPos = (Vector)(_elasticPos + ball.Pos) / 2;
//            }
//            Ellipse.CenterOnCanvas(_elasticPos);
//            TextBlock.CenterOnCanvas(_elasticPos);                
//        }
//
//        if (_prevZIndex != zIndex)
//        {
//            _prevZIndex = zIndex;
//            Panel.SetZIndex(Ellipse, zIndex);
//            Panel.SetZIndex(TextBlock, zIndex);
//        }
//        
//
//        public void Hide()
//        {
//            Ellipse.Visibility = Visibility.Collapsed;
//            TextBlock.Visibility = Visibility.Collapsed;
//            _elasticPos = new Vector(double.NaN, double.NaN);
//        }
//
//        public void Show()
//        {
//            Ellipse.Visibility = Visibility.Visible;
//        }
//    }
