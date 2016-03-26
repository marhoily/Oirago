using System;
using System.Linq;
using System.Windows;
using System.Windows.Threading;

namespace MyAgario
{
    public partial class MainWindow
    {
        private AgarioClient _agarioClient;
        private DispatcherTimer _dispatcherTimer;

        public MainWindow()
        {
            InitializeComponent();
            _dispatcherTimer = new DispatcherTimer(TimeSpan.FromMilliseconds(200),
                DispatcherPriority.Background, On, Dispatcher);
            _dispatcherTimer.IsEnabled = true;
        }

        private void On(object sender, EventArgs e)
        {
            var firstOrDefault = _agarioClient.World.MyBalls.FirstOrDefault();
            if (firstOrDefault == null) return;
            var b = firstOrDefault.State;
            _agarioClient.Adapter.Print($"{DateTime.Now.Second}: {b.X:f1} {b.Y:f1}");
            _agarioClient.MoveTo(b.X + 10, b.Y + 10);
        }

        private void MainWindow_OnLoaded(object sender, RoutedEventArgs e)
        {
            _agarioClient = new AgarioClient(Outer, Inner);
            _agarioClient.Spawn("blah");
            //_agarioClient.Spectate();
        }
    }
}
