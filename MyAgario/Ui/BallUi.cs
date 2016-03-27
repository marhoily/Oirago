using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Shapes;

namespace MyAgario
{
    using BallState = Message.Updates;

    public class BallUi
    {
        private readonly SolidColorBrush _solidColorBrush;
        public readonly Ellipse Ellipse;
        public readonly TextBlock TextBlock;
        private BallState _prevState;
        private BallState _currentState;

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

        public void Update(BallState nextBallState, Message.Spectate world, bool isMine)
        {
            if (_currentState == null)
            {
                _x = nextBallState.X;
                _y = nextBallState.Y;
            }

            _prevState = _currentState;
            _currentState = nextBallState;
            _solidColorBrush.Color = nextBallState.IsVirus
                ? Colors.Green : Color.FromRgb(
                    nextBallState.R, nextBallState.G, nextBallState.B);

            var s = Math.Max(20.0, nextBallState.Size);
            Ellipse.Width = Ellipse.Height = s * 2;

            if (string.IsNullOrEmpty(nextBallState.Name)) return;
            TextBlock.Text = nextBallState.Name;
            TextBlock.Visibility = Visibility.Visible;
        }

        private double _x, _y;
        public void RenderFrame(double t)
        {
            if (_currentState == null) return;
            if (_prevState == null) _prevState = _currentState;
            var x = (1 - t) * _prevState.X + t * _currentState.X;
            var y = (1 - t) * _prevState.Y + t * _currentState.Y;
            _x = (9*_x + x)/10;
            _y = (9*_y + y)/10;
            Canvas.SetLeft(Ellipse, _x - Ellipse.Width / 2);
            Canvas.SetTop(Ellipse, _y - Ellipse.Height / 2);
            Canvas.SetLeft(TextBlock, _x - TextBlock.ActualWidth / 2);
            Canvas.SetTop(TextBlock, _y - TextBlock.ActualHeight / 2);
        }
    }
}