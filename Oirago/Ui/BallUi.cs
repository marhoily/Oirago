using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Shapes;

namespace Oiraga
{
    public class BallUi
    {
        private readonly SolidColorBrush _fillBrush = new SolidColorBrush();
        private readonly SolidColorBrush _strokeBrush = new SolidColorBrush();
        public readonly Ellipse Ellipse;
        public readonly TextBlock TextBlock;
        private double _x = double.NaN;
        private double _y = double.NaN;

        public BallUi()
        {
            Ellipse = new Ellipse
            {
                Fill = _fillBrush,
                Stroke = _strokeBrush,
            };
            TextBlock = new TextBlock
            {
                FontSize = 40,
                Visibility = Visibility.Collapsed,
                TextAlignment = TextAlignment.Center
            };
        }

        public void Update(Ball ball, int zIndex, short mySize)
        {
            var t = ball.State;
            if (double.IsNaN(_x))
            {
                _x = t.X;
                _y = t.Y;
            }
            var color = t.IsVirus
                ? Color.FromArgb(128, 0, 255, 0) : Color.FromRgb(t.R, t.G, t.B);
            
            _fillBrush.Color = color;
            _strokeBrush.Color = t.IsVirus ? Colors.Red
                : Color.FromRgb((byte)(t.R * .5), (byte)(t.G * .5), (byte)(t.B * .5));


            var s = Math.Max(20.0, t.Size);
            Ellipse.Width = Ellipse.Height = s * 2;
            Ellipse.StrokeThickness = Math.Max(2, s / 20);

            if (!ball.IsFood && !t.IsVirus)
            {
                TextBlock.Foreground =
                    t.R * 0.2126 + t.G * 0.7152 + t.B * 0.0722 < 128 * 3
                    ? Brushes.Black : Brushes.White;

                var st = t.Size.ToString();
                if (mySize*.9 > s) st += "*";
                if (mySize*.7 * .9 > s) st += "*";
                if (mySize < s * .9) st = "*" + st;
                if (mySize < s * .7 * .9) st = "*" + st;
                TextBlock.Text = t.Name == null ? st : $"{t.Name}\r\n{st}";
                TextBlock.FontSize = s / 2;
                TextBlock.Visibility = Visibility.Visible;
            }

            _x = (_x + t.X) / 2;
            _y = (_y + t.Y) / 2;

            Panel.SetZIndex(Ellipse, zIndex);
            Panel.SetZIndex(TextBlock, zIndex);

            Canvas.SetLeft(Ellipse, _x - Ellipse.Width / 2);
            Canvas.SetTop(Ellipse, _y - Ellipse.Height / 2);
            Canvas.SetLeft(TextBlock, _x - TextBlock.ActualWidth / 2);
            Canvas.SetTop(TextBlock, _y - TextBlock.ActualHeight / 2);
        }
    }
}