using System;
using System.Linq;
using System.Windows;
using System.Windows.Input;
using System.Windows.Media;

namespace MyAgario
{
    public partial class MainWindow : IWindowAdapter
    {
        private readonly IAgarioClient _agarioClient;
        private readonly World _world = new World();
        private readonly TimeMeasure _measure = new TimeMeasure();
        private Camera _prevCamera, _currCamera;

        public MainWindow()
        {
            InitializeComponent();
            _agarioClient = 
                //new AgarioPlayback(this, _world);
                new AgarioClient(this, _world, new AgarioRecorder());
            CompositionTarget.Rendering += OnRenderFrame;
        }
        private void MainWindow_OnLoaded(object sender, RoutedEventArgs e)
        {
            _agarioClient.Spawn("blah");
        }

        public void Appears(Ball newGuy)
        {
            var ballUi = new BallUi();
            newGuy.Tag = ballUi;
            Inner.Children.Add(ballUi.Ellipse);
            Inner.Children.Add(ballUi.TextBlock);
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
            Inner.Children.Remove(ballUi.Ellipse);
            Inner.Children.Remove(ballUi.TextBlock);
        }

        public void AfterTick()
        {
            var my = _world.MyBalls.FirstOrDefault();
            if (my != null)
            {
                _measure.Tick();
                _currCamera = new Camera(
                    CalcZoom() - Math.Log10(Scale.Value),
                    Border.ActualWidth/2 - my.State.X,
                    Border.ActualHeight/2 - my.State.Y);
                _prevCamera = _currCamera;
                LeadBalls(my);
            }
            else
            {
                _agarioClient.Spawn("blah");
            }
        }
        private void LeadBalls(Ball my)
        {
            var position = Mouse.GetPosition(Border);
            var sdx = position.X - Border.ActualWidth / 2;
            var sdy = position.Y - Border.ActualHeight / 2;
            if (sdx * sdx + sdy * sdy < 64) return;
            var calcZoom = CalcZoom();
            var dx = sdx / calcZoom + my.State.X;
            var dy = sdy / calcZoom + my.State.Y;
            _agarioClient.MoveTo(dx, dy);
        }

        private double CalcZoom()
        {
            var totalSize = _world.MyBalls.Sum(x => x.State.Size);
            return Math.Pow(Math.Min(64.0 / totalSize, 1), 0.1)+.15;
        }
        
        private void OnRenderFrame(object sender, EventArgs args)
        {
            if (_currCamera == null) return;
            var t = _measure.Frame();
            var camera = Camera.Middle(t, _prevCamera, _currCamera);
            _translate.X = (_translate.X * 9 + camera.X) / 10;
            _translate.Y = (_translate.Y * 9 + camera.Y) / 10;
            _scale.CenterX = Border.ActualWidth / 2;
            _scale.CenterY = Border.ActualHeight / 2;
            _scale.ScaleX = _scale.ScaleY = camera.Zoom;

            foreach (var ball in _world.Balls)
                ((BallUi)ball.Value.Tag).RenderFrame(t);
        }

        private void MainWindow_OnMouseWheel(object sender, MouseWheelEventArgs e)
        {
            Scale.Value -= Math.Sign(e.Delta) * Scale.SmallChange;
        }
    }
}
