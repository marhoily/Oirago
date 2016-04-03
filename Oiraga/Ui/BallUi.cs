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
        private Vector _pos = new Vector(double.NaN, double.NaN);

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
        Color _color;
        short _size;
        public void Update(IBall ball, int zIndex, short mySize)
        {
            if (double.IsNaN(_pos.X)) { _pos = (Vector)ball.Pos; }
            if (_color != ball.Color)
            {
                _color = ball.Color;
                var color = ball.IsVirus
                    ? Color.FromArgb(128, 0, 255, 0)
                    : ball.Color;

                _fillBrush.Color = color;
                _strokeBrush.Color = ball.IsVirus
                    ? Colors.Red
                    : color.Darker();

                TextBlock.Foreground = ball.Color.
                    IsDark() ? Brushes.Black : Brushes.White;
            }
            if (_size != ball.Size)
            {
                _size = ball.Size;
                var s = Math.Max(20.0, ball.Size);
                Ellipse.Width = Ellipse.Height = s * 2;
                Ellipse.StrokeThickness = Math.Max(2, s / 20);

                if (!ball.IsFood() && !ball.IsVirus)
                {
                    var st = ball.Size.ToString();
                    if (mySize * .9 > s) st += "*";
                    if (mySize * .7 * .9 > s) st += "*";
                    if (mySize < s * .9) st = "*" + st;
                    if (mySize < s * .7 * .9) st = "*" + st;
                    TextBlock.Text = ball.Name == null ? st : $"{ball.Name}\r\n{st}";
                    TextBlock.FontSize = s / 2;
                    TextBlock.Visibility = Visibility.Visible;
                }
            }

            _pos = (Vector)(_pos + ball.Pos) / 2;

            Panel.SetZIndex(Ellipse, zIndex);
            Panel.SetZIndex(TextBlock, zIndex);

            Ellipse.CenterOnCanvas(_pos);
            TextBlock.CenterOnCanvas(_pos);
        }

        public void Hide()
        {
            Ellipse.Visibility = Visibility.Collapsed;
            TextBlock.Visibility = Visibility.Collapsed;
            _pos = new Vector(double.NaN, double.NaN);
        }

        public void Show()
        {
            Ellipse.Visibility = Visibility.Visible;
        }
    }
}