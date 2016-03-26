using System;
using System.Linq;
using System.Windows;
using System.Windows.Threading;
using static System.Double;

namespace MyAgario
{
    public partial class MainWindow
    {
        private AgarioClient _agarioClient;
        private DispatcherTimer _dispatcherTimer;

        public MainWindow()
        {
            InitializeComponent();
            _dispatcherTimer = new DispatcherTimer(
                TimeSpan.FromMilliseconds(40),
                DispatcherPriority.Background, On, Dispatcher)
            {
                IsEnabled = true
            };
        }

        private double _t;
        private bool _spawn = true;
        private bool _first = true;
        private void On(object sender, EventArgs e)
        {
            var firstOrDefault = _agarioClient.World.MyBalls.FirstOrDefault();
            if (firstOrDefault == null)
            {
                if (_spawn)
                {
                    _first = true;
                    _spawn = false;
                    _agarioClient.Spawn("blah");
                }
                return;
            }
            if (_first)
            {
                _spawn = true;
                _first = false;
            }
            var b = firstOrDefault.State;

            var calcZoom = CalcZoom();
            if (!IsNaN(calcZoom))
                _scale.ScaleX = _scale.ScaleY = Scale.Value + calcZoom;
            _translate.X = OffsetX.Value - b.X;
            _translate.Y = OffsetY.Value - b.Y;
            _agarioClient.Adapter.Print(
                $"{Scale.Value:f1}: {OffsetX.Value:f1} {OffsetY.Value:f1}");
            _agarioClient.MoveTo(5+10 * Math.Sin(_t), 5+10 * Math.Cos(_t));
            _t += .02;
        }

        private double CalcZoom()
        {
            if (_agarioClient.World.MyBalls.Count == 0) return NaN;
            var totalSize = _agarioClient.World.MyBalls.Sum(x => x.State.Size);
            return
                Math.Pow(Math.Min(64.0 / totalSize, 1), 0.4) *
                Math.Max(Border.ActualHeight / 1080, Border.ActualWidth / 1920);
        }

        private void MainWindow_OnLoaded(object sender, RoutedEventArgs e)
        {
            _agarioClient = new AgarioClient(Outer, Inner);
            //_agarioClient.Spawn("blah");
            //_agarioClient.Spectate();
        }

        private void MainWindow_OnSizeChanged(object sender, SizeChangedEventArgs e)
        {
            OffsetX.Value = Border.ActualWidth;
            OffsetY.Value = Border.ActualHeight;
        }
    }
}
