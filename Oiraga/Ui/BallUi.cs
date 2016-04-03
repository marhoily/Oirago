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
        private Vector _elasticPos = new Vector(double.NaN, double.NaN);
        Color _prevColor;
        short _prevSize;
        int _prevZIndex;
        private Point _prevPos;


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
        public void Update(IBall ball, int zIndex, short mySize)
        {
            
            if (_prevColor != ball.Color)
            {
                _prevColor = ball.Color;
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
            if (_prevSize != ball.Size)
            {
                _prevSize = ball.Size;
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
            if (_prevPos != ball.Pos)
            {
                _prevPos = ball.Pos;
                if (double.IsNaN(_elasticPos.X))
                {
                    _elasticPos = (Vector)ball.Pos;
                }
                else
                {
                    _elasticPos = (Vector)(_elasticPos + ball.Pos) / 2;
                }
                Ellipse.CenterOnCanvas(_elasticPos);
                TextBlock.CenterOnCanvas(_elasticPos);                
            }

            if (_prevZIndex != zIndex)
            {
                _prevZIndex = zIndex;
                Panel.SetZIndex(Ellipse, zIndex);
                Panel.SetZIndex(TextBlock, zIndex);
            }
        }

        public void Hide()
        {
            Ellipse.Visibility = Visibility.Collapsed;
            TextBlock.Visibility = Visibility.Collapsed;
            _elasticPos = new Vector(double.NaN, double.NaN);
        }

        public void Show()
        {
            Ellipse.Visibility = Visibility.Visible;
        }
    }
}