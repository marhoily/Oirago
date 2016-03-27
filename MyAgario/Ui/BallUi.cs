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

        public void Update(Message.Updates nextBallState, Message.Spectate world)
        {
            _solidColorBrush.Color = nextBallState.IsVirus
                ? Colors.Green : Color.FromRgb(nextBallState.R, nextBallState.G, nextBallState.B);

            var s = Math.Max(25.0, nextBallState.Size);
            Ellipse.Width = Ellipse.Height = s*2;
            Canvas.SetLeft(Ellipse, nextBallState.X - world.X - s);
            Canvas.SetTop(Ellipse, nextBallState.Y - world.Y - s);
            Canvas.SetLeft(TextBlock, nextBallState.X - world.X - TextBlock.ActualWidth / 2);
            Canvas.SetTop(TextBlock, nextBallState.Y - world.Y - TextBlock.ActualHeight / 2);

            if (string.IsNullOrEmpty(nextBallState.Name)) return;
            TextBlock.Text = nextBallState.Name;
            TextBlock.Visibility = Visibility.Visible;
        }
    }
}