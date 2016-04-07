using System;
using System.Text;
using System.Threading;
using WebSocketSharp;

namespace Oiraga
{
    public sealed class PlayServerConnection : IPlayServerConnection
    {
        private readonly ILog _log;
        private readonly PlayServerKey _connection;
        private readonly WebSocket _webSocket;
        private TimeSpan _pause = TimeSpan.FromMilliseconds(50);

        public ICommandsSink Input { get; }
        public IEventsFeed Output { get; }

        public PlayServerConnection(PlayServerKey connection,
            EventsRecorder recorder, ILog log)
        {
            _log = log;
            _connection = connection;

            log.Error("opening...");
            _webSocket = new WebSocket("ws://" + connection.Server)
            {
                Origin = "http://agar.io"
            };
            _webSocket.OnOpen += OnOpen;
            _webSocket.OnError += OnWebSocketOnOnError;
            _webSocket.OnClose += OnWebSocketOnOnClose;

            Input = new CommandsSink(_webSocket);
            Output = new EventsFeed(_webSocket, recorder);
            _webSocket.Connect();
        }

        private void OnWebSocketOnOnError(object s, ErrorEventArgs e)
            => _log.Error(e.Message);

        private void OnWebSocketOnOnClose(object s, CloseEventArgs e)
        {
            Timer[] timer = {null};
            timer[0] = new Timer(
                _ =>
                {
                    _log.Error("another try at _webSocket.Connect()...");
                    _webSocket.Connect();
                    timer[0].Dispose();
                },
                timer, _pause, TimeSpan.FromMilliseconds(-1));
            _pause = new TimeSpan(_pause.Ticks*2);
        }

        private void OnOpen(object sender, EventArgs e)
        {
            _log.Error("");
            _webSocket.Send(new byte[] { 254, 5, 255, 35, 18, 56, 9, 80 });
            _webSocket.Send(Encoding.ASCII.GetBytes(_connection.Key));
        }

        public void Dispose() => ((IDisposable)_webSocket).Dispose();
    }
}