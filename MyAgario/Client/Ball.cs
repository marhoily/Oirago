using System;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Shapes;

namespace MyAgario
{
    public class Ball
    {
        private readonly Canvas _canvas;
        public bool Mine;
        public string Nick;
        public short Size;
        private readonly SolidColorBrush _solidColorBrush;
        private readonly Ellipse _ellipse;

        public Ball(Canvas canvas)
        {
            _canvas = canvas;
            _solidColorBrush = new SolidColorBrush();
            _ellipse = new Ellipse { Fill = _solidColorBrush };
            canvas.Children.Add(_ellipse);
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
        }

        public void Destroy()
        {
            _canvas.Children.Remove(_ellipse);
        }
    }
}