using System;
using System.Linq;
using System.Windows;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Threading;

namespace MyAgario
{
    public partial class MainWindow : IWindowAdapter
    {
        private readonly AgarioClient _agarioClient;
        private readonly World _world = new World();
        private readonly TimeMeasure _measure = new TimeMeasure();
        private Camera _prevCamera, _currCamera;

        public MainWindow()
        {
            InitializeComponent();
            _agarioClient = new AgarioClient(this, _world);
            GC.KeepAlive(new DispatcherTimer(
                TimeSpan.FromMilliseconds(40),
                DispatcherPriority.Background, On, Dispatcher)
            {
                IsEnabled = true
            });
            CompositionTarget.Rendering += OnRenderFrame;
        }

        private void On(object sender, EventArgs e)
        {
            var my = _world.MyBalls.FirstOrDefault();
            if (my == null) return;
            var position = Mouse.GetPosition(Border);
            var dx = position.X - Border.ActualWidth/2;
            var dy = position.Y - Border.ActualHeight / 2;
            var norm = Math.Sqrt(dx*dx + dy*dy);
            _agarioClient.MoveTo(100.0*dx / norm, 100.0 * dy / norm);
        }

        private void MainWindow_OnLoaded(object sender, RoutedEventArgs e)
        {
            _agarioClient.Spawn("blah");
        }

        private void MainWindow_OnSizeChanged(object sender, SizeChangedEventArgs e)
        {
            OffsetX.Value = Border.ActualWidth/2;
            OffsetY.Value = Border.ActualHeight/2;
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
            ((BallUi)newGuy.Tag).Update(newGuy.State, world);
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
                    Scale.Value + CalcZoom(),
                    OffsetX.Value - my.State.X, 
                    OffsetY.Value - my.State.Y);
                _prevCamera = _currCamera;
            }
            else _agarioClient.Spawn("blah");
        }

        private double CalcZoom()
        {
            var totalSize = _world.MyBalls.Sum(x => x.State.Size);
            return Math.Pow(Math.Min(64.0/totalSize, 1), 0.4);
        }

        private void OnRenderFrame(object sender, EventArgs args)
        {
            if (_currCamera == null) return;
            var t = _measure.Frame();
            var camera = Camera.Middle(t, _prevCamera, _currCamera);
            _translate.X = camera.X;
            _translate.Y = camera.Y;
            _scale.CenterX = Border.ActualWidth/2;
            _scale.CenterY = Border.ActualHeight/ 2;
            _scale.ScaleX = _scale.ScaleY = camera.Zoom;

            foreach (var ball in _world.Balls)
                ((BallUi)ball.Value.Tag).RenderFrame(t);
        }

        private void MainWindow_OnMouseWheel(object sender, MouseWheelEventArgs e)
        {
            Scale.Value += Math.Sign(e.Delta) * Scale.SmallChange;

        }
    }
}
