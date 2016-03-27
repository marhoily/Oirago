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
        private double _targetZoom;
        private double _targetOffsetX;
        private double _targetOffsetY;

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
            OffsetX.Value = Border.ActualWidth;
            OffsetY.Value = Border.ActualHeight;
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
                var calcZoom = CalcZoom();
                _targetZoom = Scale.Value + calcZoom/2;
                _targetOffsetX = OffsetX.Value - my.State.X;
                _targetOffsetY = OffsetY.Value - my.State.Y;
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
            var t = _measure.Frame();
            _translate.X = (_targetOffsetX + _translate.X) / 2;
            _translate.Y = (_targetOffsetY + _translate.Y) / 2;
            _scale.ScaleX = _scale.ScaleY =  _targetZoom;

            foreach (var ball in _world.Balls)
                ((BallUi)ball.Value.Tag).RenderFrame(t);
        }
    }
}
