using System;
using System.Linq;
using System.Windows;
using System.Windows.Input;
using static MyAgario.Message;

namespace MyAgario
{
    public partial class AgarioControl : IWindowAdapter
    {
        private IAgarioClient _agarioClient;
        private readonly World _world = new World();
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
                            processor.ProcessMessage(msg)));
                    _agarioClient.Spawn("blah");
                }
            });
        }

        public void Appears(Ball newGuy)
        {
            var ballUi = new BallUi();
            newGuy.Tag = ballUi;
            MainCanvas.Children.Add(ballUi.Ellipse);
            MainCanvas.Children.Add(ballUi.TextBlock);
        }
        public void Update(Ball newGuy)
            => ((BallUi)newGuy.Tag).Update(newGuy);

        public void Eats(Ball eater, Ball eaten) { }

        public void Remove(Ball dying)
        {
            var ballUi = (BallUi)dying.Tag;
            MainCanvas.Children.Remove(ballUi.Ellipse);
            MainCanvas.Children.Remove(ballUi.TextBlock);
        }

        public void AfterTick()
        {
            if (_world.MyBalls.Count > 0)
            {
                var myAverage = _world.MyAverage;
                LeadBalls(myAverage);
                UpdateCenter(myAverage);
                UpdateScale();
                var zIndex = 0;
                var balls = _world.Balls.OrderBy(b => b.Value.State.Size);
                foreach (var ball in balls)
                    ((BallUi)ball.Value.Tag).RenderFrame(++zIndex);
            }
            else _agarioClient.Spawn("blah");
        }

        private void UpdateScale()
        {
            var scale = _world.Zoom - Math.Log10(_zoom);
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

        public void Error(string message)
        {
            Dispatcher.BeginInvoke(new Action(
                () => ErrorLabel.Text = message));
        }

        public void Leaders(LeadersBoard leadersBoard)
        {
            Leadersboard.ItemsSource = leadersBoard.Leaders.Select(l => l.Name);
        }

        private void LeadBalls(Point me)
        {
            var position = Mouse.GetPosition(this);
            var sdx = position.X - ActualWidth / 2;
            var sdy = position.Y - ActualHeight / 2;
            if (sdx * sdx + sdy * sdy < 64) return;
            var z = _world.Zoom;
            _agarioClient.MoveTo(sdx / z + me.X, sdy / z + me.Y);
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
