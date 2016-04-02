using System;
using System.Text;
using System.Threading;
using WebSocketSharp;

namespace Oiraga
{
    public class ServerConnection
    {
        public string Key;
        public string Server;
        private IWindowAdapter _windowAdapter;
        private WebSocket _webSocket;
        private TimeSpan _pause = TimeSpan.FromMilliseconds(50);

        public WebSocket ToWebSocket(IWindowAdapter windowAdapter)
        {
            _windowAdapter = windowAdapter;
            _windowAdapter.Error("opening...");
            _webSocket = new WebSocket("ws://" + Server)
            {
                Origin = "http://agar.io"
            };
            _webSocket.OnOpen += OnOpen;
            _webSocket.OnError += OnWebSocketOnOnError;
            _webSocket.OnClose += OnWebSocketOnOnClose;
            return _webSocket;
        }

        private void OnWebSocketOnOnError(object s, ErrorEventArgs e)
        {
            _windowAdapter.Error(e.Message);
        }

        private void OnWebSocketOnOnClose(object s, CloseEventArgs e)
        {
            Thread.Sleep(_pause);
            _pause = new TimeSpan(_pause.Ticks*2);
            _webSocket.Connect();
        }

        private void OnOpen(object sender, EventArgs e)
        {
            _windowAdapter.Error("");
            _webSocket.Send(new byte[] { 254, 5, 255, 35, 18, 56, 9, 80 });
            _webSocket.Send(Encoding.ASCII.GetBytes(Key));
        }

        public void Dispose()
        {
            _webSocket.OnError -= OnWebSocketOnOnError;
            _webSocket.OnClose -= OnWebSocketOnOnClose;
        }
    }
}