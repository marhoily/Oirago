using System;
using System.Text;
using System.Threading;
using WebSocketSharp;

namespace MyAgario
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
            _webSocket.OnError += (s, e) => _windowAdapter.Error(e.Message);
            _webSocket.OnClose += (s, e) =>
            {
                Thread.Sleep(_pause);
                _pause = new TimeSpan(_pause.Ticks * 2);
                _webSocket.Connect();
            };
            return _webSocket;
        }

        private void OnOpen(object sender, EventArgs e)
        {
            _windowAdapter.Error("");
            _webSocket.Send(new byte[] { 254, 5, 255, 35, 18, 56, 9, 80 });
            _webSocket.Send(Encoding.ASCII.GetBytes(Key));
        }
    }
}