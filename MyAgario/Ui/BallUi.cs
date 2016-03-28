using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Ink;
using System.Windows.Media;
using System.Windows.Shapes;
using MyAgario.Utils;

namespace MyAgario
{
    using BallState = Message.Updates;

    public class BallUi
    {
        private readonly SolidColorBrush _fillBrush = new SolidColorBrush();
        public readonly Ellipse Ellipse;
        public readonly TextPath TextBlock;
        private BallState _prevState;
        private BallState _currentState;
        private double _x, _y;
        private SolidColorBrush _strokeBrush = new SolidColorBrush();

        public BallUi()
        {
            Ellipse = new Ellipse {
                Fill = _fillBrush,
                Stroke = _strokeBrush,
            };
            TextBlock = new TextPath {
                FontSize = 40,
                Visibility = Visibility.Collapsed,
                StrokeThickness = 1.0,
                Fill = Brushes.White,
                Stroke = Brushes.Black
            };
        }

        public void Update(BallState st, Message.Spectate world, bool isMine)
        {
            if (_currentState == null)
            {
                _x = st.X;
                _y = st.Y;
            }

            _prevState = _currentState;
            _currentState = st;
            _fillBrush.Color = st.IsVirus
                ? Color.FromArgb(128, 0, 255, 0)
                : Color.FromRgb(st.R, st.G, st.B);
            _strokeBrush.Color = st.IsVirus
                ? Colors.Red
                : Color.FromRgb(
                    (byte) (st.R*.5),
                    (byte) (st.G*.5),
                    (byte) (st.B*.5));

            var s = Math.Max(20.0, st.Size);
            Ellipse.Width = Ellipse.Height = s * 2;
            Ellipse.StrokeThickness = Math.Max(2, s / 20);

            if (string.IsNullOrEmpty(st.Name)) return;
            TextBlock.Text = st.Name;
            TextBlock.Visibility = Visibility.Visible;
        }

        public void RenderFrame(double t)
        {
            if (_currentState == null) return;
            if (_prevState == null) _prevState = _currentState;
            var x = (1 - t) * _prevState.X + t * _currentState.X;
            var y = (1 - t) * _prevState.Y + t * _currentState.Y;
            _x = (9 * _x + x) / 10;
            _y = (9 * _y + y) / 10;
            Canvas.SetLeft(Ellipse, _x - Ellipse.Width / 2);
            Canvas.SetTop(Ellipse, _y - Ellipse.Height / 2);
            Canvas.SetLeft(TextBlock, _x - TextBlock.ActualWidth / 2);
            Canvas.SetTop(TextBlock, _y - TextBlock.ActualHeight / 1.7);
        }
    }
}