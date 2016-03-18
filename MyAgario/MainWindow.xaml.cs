using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Shapes;

namespace MyAgario
{
    public partial class MainWindow : Window
    {
        private AgarioClient _agarioClient;

        public MainWindow()
        {
            InitializeComponent();
        }

        private void MainWindow_OnLoaded(object sender, RoutedEventArgs e)
        {
            _agarioClient = new AgarioClient(Draw);
            _agarioClient.Spectate();
        }

        private void Draw(WorldState world)
        {
            _canvas.Children.Clear();
            //_scale.CenterX = _canvas.ActualWidth / 2;
            //_scale.CenterY = _canvas.ActualHeight/2;
            _scale.ScaleX = .2;
            _scale.ScaleY = .2;
            _tanslate.X = _canvas.ActualWidth/2;
            _tanslate.Y = _canvas.ActualHeight/2;
            foreach (var entry in world.Balls)
            {
                var ball = entry.Value;
                var size = Math.Max(25.0, ball.Size);
                var ellipse = new Ellipse
                {
                    Fill = new SolidColorBrush
                    {
                        Color = Color.FromRgb(ball.R, ball.G, ball.B),
                    },
                    Width = size,
                    Height = size
                };
                _canvas.Children.Add(ellipse);
                Canvas.SetLeft(ellipse, ball.X - world.X - size/2);
                Canvas.SetTop (ellipse, ball.Y - world.Y - size / 2);
            }
        }
    }
}
