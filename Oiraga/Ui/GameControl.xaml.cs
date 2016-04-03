using System;
using System.Linq;
using System.Windows;
using System.Windows.Input;

namespace Oiraga
{
    public partial class GameControl : IGameEventsSink
    {
        private readonly IGameInput _gameClient;
        private double _zoom = 5;

        public GameControl(IGameRawOutut gameRawOutut, IGameInput input, ILog log)
        {
            _gameClient = input;
            gameRawOutut.Attach(
                new GameMessageProcessor(this, log), 
                Dispatcher);

            InitializeComponent();
        }

        public void Appears(Ball newGuy)
        {
            var ballUi = new BallUi();
            newGuy.Tag = ballUi;
            MainCanvas.Children.Add(ballUi.Ellipse);
            MainCanvas.Children.Add(ballUi.TextBlock);
        }

        public void Eats(Ball eater, Ball eaten) { }

        public void Remove(Ball dying)
        {
            var ballUi = (BallUi)dying.Tag;
            MainCanvas.Children.Remove(ballUi.Ellipse);
            MainCanvas.Children.Remove(ballUi.TextBlock);
        }

        public void AfterTick(World world)
        {
            if (world.MyBalls.Count > 0)
            {
                var myAverage = world.MyAverage;
                LeadBalls(myAverage, world.Zoom04);
                UpdateCenter(myAverage);
                UpdateScale(world);
                var zIndex = 0;
                var balls = world.Balls.OrderBy(b => b.Value.State.Size);
                var mySize = world.MyBalls.Max(b => b.State.Size);
                foreach (var ball in balls)
                {
                    var b = ball.Value;
                    var ui = (BallUi)b.Tag;
                    ui.Update(b, ++zIndex, mySize);
                }
            }
            else
            {
                _worldBoundaries = Rect.Empty;
                _gameClient.Spawn("blah");
            }
        }

        private void UpdateScale(World world)
        {
            var scale = world.Zoom - Math.Log10(_zoom);
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


        public void Leaders(Message.LeadersBoard leadersBoard)
        {
            Leadersboard.ItemsSource = leadersBoard.Leaders.Select(l => l.Name);
        }

        private Rect _worldBoundaries;
        public void WorldSize(Rect viewPort)
        {
            _worldBoundaries = !_worldBoundaries.IsEmpty
                ? Rect.Union(_worldBoundaries, viewPort) : viewPort;
            ViewPort.SetOnCanvas(viewPort);
            WorldBoundaries.SetOnCanvas(_worldBoundaries);
            Back.SetOnCanvas(Rect.Inflate(_worldBoundaries, 1000, 1000));
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
        {
            _zoom -= Math.Sign(e.Delta) * .1;
        }

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
