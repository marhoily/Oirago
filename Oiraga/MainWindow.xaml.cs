using System;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;

namespace Oiraga
{
    public partial class MainWindow : ILog
    {
        private readonly ReceiverComposer
            _middleman = new ReceiverComposer();

        private IPlayServerConnection _gameClient;

        public MainWindow()
        {
            InitializeComponent();
            LoadClient()
                .ContinueWith(t =>
                {
                    if (t.IsFaulted && t.Exception != null)
                        Error(t.Exception.InnerExceptions[0].ToString());
                });
        }

        private async Task LoadClient()
        {
            var gameClientProvider = new PlayServerSelector(this);
            _gameClient = await gameClientProvider.GetGameClient();
            var oiragaControl = new GameControl(_gameClient.Output, _gameClient.Input, this);
            oiragaControl.Loaded += (s, e) => oiragaControl.Focus();
            GameControlPlace.Content = oiragaControl;
            _middleman.Listeners.Add(oiragaControl);
        }
        public void Error(string message)
        {
            Dispatcher.BeginInvoke(new Action(
                () => ErrorLabel.Text = message));
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

        private void MainWindow_OnClosed(object sender, EventArgs e)
        {
            _gameClient.Dispose();
        }
    }
}
