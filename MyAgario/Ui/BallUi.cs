using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Shapes;
using MyAgario.Utils;

namespace MyAgario
{
    public class BallUi
    {
        private readonly SolidColorBrush _fillBrush = new SolidColorBrush();
        private readonly SolidColorBrush _strokeBrush = new SolidColorBrush();
        public readonly Ellipse Ellipse;
        public readonly TextBlock TextBlock;
        private Ball _ball;
        private double _x, _y;

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

        public void Update(Ball ball)
        {
            if (_ball == null)
            {
                _x = ball.State.X;
                _y = ball.State.Y;
            }

            _ball = ball;
            var color = ball.State.IsVirus
                ? Color.FromArgb(128, 0, 255, 0)
                : Color.FromRgb(ball.State.R, ball.State.G, ball.State.B);
            _fillBrush.Color = color;
            _strokeBrush.Color = ball.State.IsVirus
                ? Colors.Red
                : Color.FromRgb(
                    (byte)(color.R * .5),
                    (byte)(color.G * .5),
                    (byte)(color.B * .5));

            var s = Math.Max(20.0, ball.State.Size);
            Ellipse.Width = Ellipse.Height = s * 2;
            Ellipse.StrokeThickness = Math.Max(2, s / 20);

            if (!ball.IsFood && !ball.State.IsVirus)
            {
                TextBlock.Foreground = 
                    color.R + color.G + color.B > 128*3
                    ? Brushes.Black
                    : Brushes.White;

                TextBlock.Text = ball.State.Name == null 
                    ? ball.State.Size.ToString()
                    : ball.State.Name + "\r\n" + ball.State.Size;
                TextBlock.FontSize = s/2;
                TextBlock.Visibility = Visibility.Visible;
            }
        }

        public void RenderFrame()
        {
            var x = _ball.State.X;
            var y = _ball.State.Y;
            _x = (_x + x) / 2;
            _y = (_y + y) / 2;

            Canvas.SetLeft(Ellipse, _x - Ellipse.Width / 2);
            Canvas.SetTop(Ellipse, _y - Ellipse.Height / 2);
            Canvas.SetLeft(TextBlock, _x - TextBlock.ActualWidth / 2);
            Canvas.SetTop(TextBlock, _y - TextBlock.ActualHeight / 2);
        }
    }
}