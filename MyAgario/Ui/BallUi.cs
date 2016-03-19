using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Shapes;

namespace MyAgario
{
    public class BallUi
    {
        private readonly SolidColorBrush _solidColorBrush;
        public readonly Ellipse Ellipse;
        public readonly TextBlock TextBlock;

        public BallUi()
        {
            _solidColorBrush = new SolidColorBrush();
            Ellipse = new Ellipse { Fill = _solidColorBrush };
            TextBlock = new TextBlock
            {
                FontSize = 40,
                Visibility = Visibility.Collapsed
            };
        }

        public void Update(Message.Updates appears, Message.Spectate world)
        {
            _solidColorBrush.Color = appears.IsVirus
                ? Colors.Green : Color.FromRgb(appears.R, appears.G, appears.B);

            var s = Math.Max(25.0, appears.Size);
            Ellipse.Width = Ellipse.Height = s*2;
            Canvas.SetLeft(Ellipse, appears.X - world.X - s);
            Canvas.SetTop(Ellipse, appears.Y - world.Y - s);
            Canvas.SetLeft(TextBlock, appears.X - world.X - TextBlock.ActualWidth / 2);
            Canvas.SetTop(TextBlock, appears.Y - world.Y - TextBlock.ActualHeight / 2);

            if (string.IsNullOrEmpty(appears.Name)) return;
            TextBlock.Text = appears.Name;
            TextBlock.Visibility = Visibility.Visible;
        }
    }
}