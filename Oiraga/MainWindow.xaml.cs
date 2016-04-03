using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;

namespace Oiraga
{
    public partial class MainWindow
    {
        private readonly WindowAdapterComposer
            _middleman = new WindowAdapterComposer();

        public MainWindow()
        {
            InitializeComponent();
            RealDeal(new GameClientProvider(_middleman));
        }

        private void RealDeal(GameClientProvider gameClientProvider)
        {
            Connect(gameClientProvider).ContinueWith(t =>
            {
                if (t.IsFaulted && t.Exception != null)
                    _middleman.Error(t.Exception.InnerExceptions[0].ToString());
            });
        }

        private async Task Connect(GameClientProvider gameClientProvider)
        {
            var oiragaControl = new OiragaControl(
                await gameClientProvider.GetGameClient());
            Content = oiragaControl;
            _middleman.Listeners.Add(oiragaControl);
        }
        
        protected override void OnContentChanged(object oldContent, object newContent)
        {
            ((UIElement)Content).Focus();
            base.OnContentChanged(oldContent, newContent);
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
