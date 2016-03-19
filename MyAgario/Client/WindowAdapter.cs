using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;

namespace MyAgario
{
    public interface IWindowAdapter
    {
        void Update(Ball newGuy, Updates appears, Spectate world);
        void Eats(Ball eater, Ball eaten);
        void Remove(Ball eaten);
    }

    public sealed class WindowAdapter : IWindowAdapter
    {
        private readonly Canvas _canvas;

        public WindowAdapter(Canvas canvas)
        {
            _canvas = canvas;
        }

        public void Appears(Ball newGuy)
        {
            _canvas.Children.Add(newGuy.Ellipse);
            _canvas.Children.Add(newGuy.TextBlock);
        }
        public void Update(Ball newGuy, Updates appears, Spectate world)
        {
            var ellipse = newGuy.Ellipse;
            var text = newGuy.TextBlock;

            newGuy.SolidColorBrush.Color = appears.IsVirus
                ? Colors.Green : Color.FromRgb(appears.R, appears.G, appears.B);

            var s = Math.Max(25.0, appears.Size);
            ellipse.Width = ellipse.Height = s;
            Canvas.SetLeft(ellipse, appears.X - world.X - s / 2);
            Canvas.SetTop(ellipse, appears.Y - world.Y - s / 2);
            Canvas.SetLeft(text, appears.X - world.X - text.ActualWidth / 2);
            Canvas.SetTop(text, appears.Y - world.Y - text.ActualHeight / 2);

            if (string.IsNullOrEmpty(appears.Name)) return;
            text.Text = appears.Name;
            text.Visibility = Visibility.Visible;
        }

        public void Eats(Ball eater, Ball eaten)
        {
        }

        public void Remove(Ball eaten)
        {
            _canvas.Children.Remove(eaten.Ellipse);
            _canvas.Children.Remove(eaten.TextBlock);
        }
    }
}