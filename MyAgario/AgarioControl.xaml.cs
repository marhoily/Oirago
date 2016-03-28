using System;
using System.Linq;
using System.Windows;
using System.Windows.Input;
using System.Windows.Media;

namespace MyAgario
{
    public partial class AgarioControl : IWindowAdapter
    {
        private IAgarioClient _agarioClient;
        private readonly World _world = new World();
        private readonly TimeMeasure _measure = new TimeMeasure();
        private Camera _prevCamera, _currCamera;
        private double _zoom = 5;

        public AgarioControl()
        {
            InitializeComponent();

            var entryServer = new EntryServer(this);
            entryServer.GetFfaServer().ContinueWith(t =>
            {
                if (t.IsFaulted && t.Exception != null)
                {
                    Error(t.Exception.InnerExceptions[0].ToString());
                }
                else if (t.IsCompleted)
                {
                    _agarioClient = new AgarioClient(this,
                        new AgarioRecorder(), t.Result);
                    var processor = new MessageProcessor(this, _world);
                    _agarioClient.OnMessage += (s, msg) =>
                        Dispatcher.BeginInvoke(new Action(() =>
                        {
                            processor.ProcessMessage(msg);
                        }));
                    _agarioClient.Spawn("blah");
                }
            });

            CompositionTarget.Rendering += OnRenderFrame;
        }

        public void Appears(Ball newGuy)
        {
            var ballUi = new BallUi();
            newGuy.Tag = ballUi;
            MainCanvas.Children.Add(ballUi.Ellipse);
            MainCanvas.Children.Add(ballUi.TextBlock);
        }
        public void Update(Ball newGuy, Message.Spectate world)
        {
            ((BallUi)newGuy.Tag).Update(newGuy.State, world, newGuy.IsMine);
        }

        public void Eats(Ball eater, Ball eaten)
        {
        }

        public void Remove(Ball dying)
        {
            var ballUi = (BallUi)dying.Tag;
            MainCanvas.Children.Remove(ballUi.Ellipse);
            MainCanvas.Children.Remove(ballUi.TextBlock);
        }

        public void AfterTick()
        {
            //var my = _world.MyBalls.FirstOrDefault();
            if (_world.MyBalls.Count > 0)
            {
                var myAverage = new Point(
                    _world.MyBalls.Average(b => b.State.X),
                    _world.MyBalls.Average(b => b.State.Y));

                _measure.Tick();
                _currCamera = new Camera(
                    CalcZoom() - Math.Log10(_zoom),
                    ActualWidth / 2 - myAverage.X,
                    ActualHeight / 2 - myAverage.Y);
                _prevCamera = _currCamera;
                LeadBalls(myAverage);
            }
            else _agarioClient.Spawn("blah");
        }

        public void Error(string message)
        {
            Dispatcher.BeginInvoke(new Action(
                () => ErrorLabel.Text = message));
        }

        private void LeadBalls(Point my)
        {
            var position = Mouse.GetPosition(this);
            var sdx = position.X - ActualWidth / 2;
            var sdy = position.Y - ActualHeight / 2;
            if (sdx * sdx + sdy * sdy < 64) return;
            var calcZoom = CalcZoom();
            var dx = sdx / calcZoom + my.X;
            var dy = sdy / calcZoom + my.Y;
            _agarioClient.MoveTo(dx, dy);
        }

        private double CalcZoom()
        {
            var totalSize = _world.MyBalls.Sum(x => x.State.Size);
            return Math.Pow(Math.Min(64.0 / totalSize, 1), 0.1) + .15;
        }

        private void OnRenderFrame(object sender, EventArgs args)
        {
            if (_currCamera == null) return;
            var t = _measure.Frame();
            var camera = Camera.Middle(t, _prevCamera, _currCamera);
            TranslateTransform.X = (TranslateTransform.X * 9 + camera.X) / 10;
            TranslateTransform.Y = (TranslateTransform.Y * 9 + camera.Y) / 10;
            ScaleTransform.ScaleX = ScaleTransform.ScaleY = camera.Zoom;

            foreach (var ball in _world.Balls)
                ((BallUi)ball.Value.Tag).RenderFrame(t);
        }

        protected override void OnMouseWheel(MouseWheelEventArgs e)
        {
            _zoom -= Math.Sign(e.Delta) * .1;
            ZoomLabel.Text = _zoom.ToString("f1");
        }

        protected override void OnKeyDown(KeyEventArgs e)
        {
            switch (e.Key)
            {
                case Key.Space:
                    _agarioClient.Split();
                    break;
                case Key.W:
                    _agarioClient.Eject();
                    break;
            }
        }
    }
}
