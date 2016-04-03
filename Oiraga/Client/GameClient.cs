using System;
using System.Text;
using System.Threading;
using WebSocketSharp;

namespace Oiraga
{
    public sealed class GameClient : IGameClient
    {
        private readonly ILog _log;
        private readonly ServerConnection _connection;
        private readonly WebSocket _webSocket;
        private TimeSpan _pause = TimeSpan.FromMilliseconds(50);

        public IGameInput Input { get; }
        public IGameRawOutput RawOutput { get; }

        public GameClient(ILog log,
            GameRecorder recorder, ServerConnection connection)
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

            Input = new GameInput(_webSocket);
            RawOutput = new GameRawOutput(log, recorder, _webSocket);
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

        public void Dispose()
        {
            _webSocket.OnError -= OnWebSocketOnOnError;
            _webSocket.OnClose -= OnWebSocketOnOnClose;
            _webSocket.Close();
        }
    }
}