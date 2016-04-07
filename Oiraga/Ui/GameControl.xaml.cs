using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Shapes;

namespace Oiraga
{
    public partial class GameControl : IReceiver
    {
        private readonly ICommandsSink _gameClient;
        private double _zoom = 5;
        private readonly Dictionary<IBall, BallUi>
            _map = new Dictionary<IBall, BallUi>();
        private readonly Stack<BallUi> _hidden = new Stack<BallUi>();

        public GameControl(IEventsFeed eventsFeed, ICommandsSink input, ILog log)
        {
            _gameClient = input;
            eventsFeed.Attach(
                new EventDispatcher(this, log)).ContinueWith(t =>
                {
                    if (t.Exception != null)
                        log.Error(t.Exception.InnerException.Message);
                });

            InitializeComponent();

            AddGrid();
        }

        private void AddGrid()
        {
            const int k = 1000;
            const int th = 30;
            const int m = 15;
            var brush = new SolidColorBrush(Color.FromRgb(20, 20, 20));
            for (var i = -m; i <= m; i++)
            {
                LinesGrid.Children.Add(
                    new Line
                    {
                        X1 = -m*k,
                        X2 = m*k,
                        Y1 = i*k,
                        Y2 = i*k,
                        Stroke = brush,
                        StrokeThickness = th,
                        UseLayoutRounding = true
                    });
                LinesGrid.Children.Add(
                    new Line
                    {
                        Y1 = -m*k,
                        Y2 = m*k,
                        X1 = i*k,
                        X2 = i*k,
                        Stroke = brush,
                        StrokeThickness = th,
                        UseLayoutRounding = true
                    });
            }
        }

        public void Appears(IBall newGuy)
        {
            BallUi ballUi;
            if (_hidden.Count == 0)
            {
                ballUi = new BallUi();
                MainCanvas.Children.Add(ballUi.Ellipse);
                MainCanvas.Children.Add(ballUi.TextBlock);
            }
            else
            {
                ballUi = _hidden.Pop();
                ballUi.Show();
            }
            _map[newGuy] = ballUi;
        }

        public void Eats(IBall eater, IBall eaten) { }

        public void Remove(IBall dying)
        {
            var ballUi = _map[dying];
            _map.Remove(dying);
            ballUi.Hide();
            _hidden.Push(ballUi);
        }

        public void AfterTick(IBalls balls)
        {
            if (balls.My.Any())
            {
                var myAverage = balls.MyAverage();
                LeadBalls(myAverage, balls.Zoom04());
                UpdateCenter(myAverage);
                UpdateScale(balls);
                var zIndex = 0;
                var bySize = balls.All.OrderBy(b => b.Size);
                var mySize = balls.My.Max(b => b.Size);
                foreach (var ball in bySize)
                    _map[ball].Update(ball, ++zIndex, mySize);
            }
            else
            {
                _worldBoundaries = Rect.Empty;
                _gameClient.Spawn("blah");
            }
        }

        private void UpdateScale(IBalls balls)
        {
            var scale = balls.Zoom() - Math.Log10(_zoom);
            ScaleTransform.ScaleX = scale;
            ScaleTransform.ScaleY = scale;
        }

        private void UpdateCenter(Point myAverage)
        {
            var x = ActualWidth / 2 - myAverage.X;
            var y = ActualHeight / 2 - myAverage.Y;
            TranslateTransform.X = (TranslateTransform.X + x) / 2;
            TranslateTransform.Y = (TranslateTransform.Y + y) / 2;
        }


        public void Leaders(IEnumerable<string> leaders)
            => Leadersboard.ItemsSource = leaders;

        private Rect _worldBoundaries;
        public void WorldSize(Rect viewPort)
        {
            _worldBoundaries = !_worldBoundaries.IsEmpty
                ? Rect.Union(_worldBoundaries, viewPort) : viewPort;
            ViewPort.PlaceOnCanvas(viewPort);
            WorldBoundaries.PlaceOnCanvas(_worldBoundaries);
            Back.PlaceOnCanvas(Rect.Inflate(_worldBoundaries, 1000, 1000));
        }

        private void LeadBalls(Point me, double zoom)
        {
            var position = Mouse.GetPosition(this);
            var sdx = position.X - ActualWidth / 2;
            var sdy = position.Y - ActualHeight / 2;
            if (sdx * sdx + sdy * sdy < 64) return;
            var z = zoom;
            _gameClient.MoveTo(sdx / z + me.X, sdy / z + me.Y);
        }

        protected override void OnMouseWheel(MouseWheelEventArgs e)
            => _zoom -= Math.Sign(e.Delta) * .1;

        protected override void OnKeyDown(KeyEventArgs e)
        {
            switch (e.Key)
            {
                case Key.Space:
                    _gameClient.Split();
                    break;
                case Key.W:
                    _gameClient.Eject();
                    break;
            }
        }
    }
}
