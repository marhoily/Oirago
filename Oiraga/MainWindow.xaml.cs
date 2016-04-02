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
            //Playback();
            RealDeal();
        }

        private void RealDeal()
        {
            Connect().ContinueWith(t =>
            {
                if (t.IsFaulted && t.Exception != null)
                    _middleman.Error(t.Exception.InnerExceptions[0].ToString());
            });
        }

        private void Playback()
        {
            var gameClient = new OiragaPlayback();
            var world = new World();
            var processor = new GameMessageProcessor(_middleman, world);
            gameClient.Attach(processor, Dispatcher);
            var oiragaControl = new OiragaControl(gameClient, world);
            Content = oiragaControl;
            _middleman.Listeners.Add(oiragaControl);
        }

        private async Task Connect()
        {
            var world = new World();
            var entryServer = new EntryServersRegistry(_middleman);
            var credentials = await entryServer.GetFfaServer();
            var gameClient = CreateGameClient(credentials, world);

            var oiragaControl = new OiragaControl(gameClient, world);
            Content = oiragaControl;
            _middleman.Listeners.Add(oiragaControl);
        }

        protected override void OnContentChanged(object oldContent, object newContent)
        {
            ((UIElement)Content).Focus();
            base.OnContentChanged(oldContent, newContent);
        }

        private OiragaClient CreateGameClient(ServerConnection credentials, 
            World world)
        {
            var gameClient = new OiragaClient(
                _middleman, new GameRecorder(), credentials);
            var processor = new GameMessageProcessor(_middleman, world);
            gameClient.Attach(processor, Dispatcher);
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
