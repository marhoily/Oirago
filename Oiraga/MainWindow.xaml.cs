using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;

namespace Oiraga
{
    public partial class MainWindow
    {
        private readonly GameEventsSinkComposer
            _middleman = new GameEventsSinkComposer();

        public MainWindow()
        {
            InitializeComponent();
            LoadClient()
                .ContinueWith(t =>
                {
                    if (t.IsFaulted && t.Exception != null)
                        _middleman.Error(t.Exception.InnerExceptions[0].ToString());
                });
        }

        private async Task LoadClient()
        {
            var gameClientProvider = new GameClientProvider(_middleman);
            var oiragaControl = new GameControl(
                await gameClientProvider.GetGameClient());
            Content = oiragaControl;
            _middleman.Listeners.Add(oiragaControl);
        }
        
        protected override void OnContentChanged(object x, object y)
        {
            ((UIElement)Content).Focus();
            base.OnContentChanged(x, y);
        }

        private void OnKeyDown(object sender, KeyEventArgs e)
        {
            if (e.Key != Key.F11) return;
            if (WindowStyle != WindowStyle.None)
            {
                WindowStyle = WindowStyle.None;
                WindowState = WindowState.Maximized;
            }
            else
            {
                WindowState = WindowState.Normal;
                WindowStyle = WindowStyle.SingleBorderWindow;
            }
        }
    }
}
