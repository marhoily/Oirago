using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows;
using System.Windows.Input;

namespace Oiraga
{
    public partial class GameControl : IReceiver
    {
        private readonly ISendCommand _sendCommand;
        private readonly Elastic _elastic = new Elastic();
        private double _zoom = 5;
        private Rect _worldBoundaries;

        private readonly Dictionary<IBall, BallUi>
            _map = new Dictionary<IBall, BallUi>();

        private readonly Stack<BallUi> _hidden = new Stack<BallUi>();

        public GameControl(IEventsFeed eventsFeed, ISendCommand input, ILog log)
        {
            _sendCommand = input;
            eventsFeed
                .Attach(new EventDispatcher(this, log))
                .LogErrors(log.LogError);

            InitializeComponent();
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
               // _sendCommand.Spawn("blah");
            }
        }

        private void UpdateScale(IBalls balls)
        {
            ScaleTransform.ScaleX = ScaleTransform.ScaleY =
                _elastic.Update(balls.Zoom() - Math.Log10(_zoom));
        }

        private void UpdateCenter(Point myAverage)
        {
            var x = ActualWidth/2 - myAverage.X;
            var y = ActualHeight/2 - myAverage.Y;
            TranslateTransform.X = (TranslateTransform.X + x)/2;
            TranslateTransform.Y = (TranslateTransform.Y + y)/2;
        }

        public void Leaders(IEnumerable<string> leaders)
        {
            Leadersboard.ItemsSource = leaders;
        }

        public void WorldSize(Rect viewPort)
        {
            _worldBoundaries = !_worldBoundaries.IsEmpty
                ? Rect.Union(_worldBoundaries, viewPort)
                : viewPort;
            ViewPort.PlaceOnCanvas(viewPort);
            WorldBoundaries.PlaceOnCanvas(_worldBoundaries);
            Back.PlaceOnCanvas(Rect.Inflate(_worldBoundaries, 1000, 1000));
        }

        public void Spectate(IBalls balls, Point center, double zoom)
        {
            AfterTick(balls);
        }

        private void LeadBalls(Point me, double zoom)
        {
            var position = Mouse.GetPosition(this);
            var sdx = position.X - ActualWidth/2;
            var sdy = position.Y - ActualHeight/2;
            if (sdx*sdx + sdy*sdy < 64) return;
            var z = zoom;
            _sendCommand.MoveTo(sdx/z + me.X, sdy/z + me.Y);
        }

        protected override void OnMouseWheel(MouseWheelEventArgs e)
        {
            if (!_elastic.IsOverriden) _zoom -= Math.Sign(e.Delta)*.1;
        }

        protected override void OnKeyDown(KeyEventArgs e)
        {
            switch (e.Key)
            {
                case Key.Space:
                    _sendCommand.Split();
                    break;
                case Key.W:
                    _sendCommand.Eject();
                    break;
                case Key.F12:
                    if (!_elastic.IsOverriden)
                        _elastic.IsOverriden = true;
                    break;
            }
            base.OnKeyDown(e);
        }

        protected override void OnKeyUp(KeyEventArgs e)
        {
            if (e.Key == Key.F12) _elastic.IsOverriden = false;
            base.OnKeyUp(e);
        }
    }
}