using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;

namespace Oiraga
{
    public partial class MainWindow
    {
        private readonly WindowAdapterComposer _middleman = new WindowAdapterComposer();

        public MainWindow()
        {
            InitializeComponent();
            Set(new OiragaPlayback());
            RealDeal();
        }

        private void Set(IOiragaClient gameClient)
        {
            var oiragaControl = new OiragaControl(gameClient);
            Content = oiragaControl;
            _middleman.Listeners.Add(oiragaControl);
        }

        private void RealDeal()
        {
            Connect().ContinueWith(t =>
            {
                if (t.IsFaulted && t.Exception != null)
                    _middleman.Error(t.Exception.InnerExceptions[0].ToString());
            });
        }

        private async Task Connect()
        {
            var entryServer = new EntryServersRegistry(_middleman);
            var credentials = await entryServer.GetFfaServer();
            Set(CreateGameClient(credentials));
        }

        protected override void OnContentChanged(object oldContent, object newContent)
        {
            ((UIElement)Content).Focus();
            base.OnContentChanged(oldContent, newContent);
        }

        private OiragaClient CreateGameClient(ServerConnection credentials)
        {
            var gameClient = new OiragaClient(
                _middleman, new GameRecorder(), credentials);
            gameClient.Spawn("blah");
            return gameClient;
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
