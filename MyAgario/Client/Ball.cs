using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Shapes;

namespace MyAgario
{
    public class Ball
    {
        private readonly Canvas _canvas;
        public bool Mine;
        private readonly SolidColorBrush _solidColorBrush;
        private readonly Ellipse _ellipse;
        private readonly TextBlock _textBlock;

        public Ball(Canvas canvas)
        {
            _canvas = canvas;
            _solidColorBrush = new SolidColorBrush();
            _ellipse = new Ellipse { Fill = _solidColorBrush };
            _canvas.Children.Add(_ellipse);
            _textBlock = new TextBlock {FontSize = 40, Visibility = Visibility.Collapsed};
            _canvas.Children.Add(_textBlock);
        }

        public void SetColor(byte r, byte g, byte b, bool isVirus)
        {
            _solidColorBrush.Color = isVirus
                ? Colors.Green : Color.FromRgb(r, g, b);
        }

        public void SetCoordinates(int x, int y, short size, WorldState world)
        {
            var s = Math.Max(25.0, size);
            _ellipse.Width = _ellipse.Height = s;
            Canvas.SetLeft(_ellipse, x - world.X - s / 2);
            Canvas.SetTop(_ellipse, y - world.Y - s / 2);
            Canvas.SetLeft(_textBlock, x - world.X - _textBlock.ActualWidth / 2);
            Canvas.SetTop(_textBlock, y - world.Y - _textBlock.ActualHeight / 2);
        }

        public void Destroy()
        {
            _canvas.Children.Remove(_ellipse);
            _canvas.Children.Remove(_textBlock);
        }

        public void SetNick(string nick)
        {
            if (!string.IsNullOrEmpty(nick))
            {
                _textBlock.Text = nick;
                _textBlock.Visibility = Visibility.Visible;
            }
        }
    }
}