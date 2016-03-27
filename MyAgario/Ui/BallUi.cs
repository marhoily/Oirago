using System;
using System.Diagnostics;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
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
        public BallState _prevState;
        public BallState _currentState;

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
            _prevState = _currentState;
            _currentState = nextBallState;
            _solidColorBrush.Color = nextBallState.IsVirus
                ? Colors.Green : Color.FromRgb(
                    nextBallState.R, nextBallState.G, nextBallState.B);
           if (!isMine)
           {
               X = nextBallState.X;
               Y = nextBallState.Y;
           }


            var s = Math.Max(12.0, nextBallState.Size);
            Ellipse.Width = Ellipse.Height = s * 2;

            if (string.IsNullOrEmpty(nextBallState.Name)) return;
            TextBlock.Text = nextBallState.Name;
            TextBlock.Visibility = Visibility.Visible;
        }

        private double X, Y;
        public void RenderFrame(double t)
        {
            if (_currentState == null) return;
            if (_prevState == null) _prevState = _currentState;
            var x = (1 - t) * _prevState.X + t * _currentState.X;
            var y = (1 - t) * _prevState.Y + t * _currentState.Y;
            X = (9*X + x)/10;
            Y = (9*Y + y)/10;
            Canvas.SetLeft(Ellipse, X - Ellipse.Width / 2);
            Canvas.SetTop(Ellipse, Y - Ellipse.Height / 2);
            Canvas.SetLeft(TextBlock, X - TextBlock.ActualWidth / 2);
            Canvas.SetTop(TextBlock, Y - TextBlock.ActualHeight / 2);
        }
    }
}