using System;
using WebSocketSharp;

namespace Oiraga
{
    public sealed class GameRawOutput : IGameRawOutut
    {
        private readonly ILog _log;
        private readonly GameRecorder _recorder;

        public GameRawOutput(ILog log, GameRecorder recorder, WebSocket ws)
        {
            _log = log;
            _recorder = recorder;
            ws.OnMessage += OnMessageReceived;
        }

        private void OnMessageReceived(object sender, EventArgs e)
        {
            var rawData = ((MessageEventArgs)e).RawData;
            _recorder.Save(rawData);
            var p = new Packet(rawData);
            var msg = p.ReadMessage();
            if (msg == null) _log.Error("buffer of length 0");
            else OnMessage?.Invoke(this, msg);
        }

        public event EventHandler<Message> OnMessage;
        public bool IsSynchronous => false;
    }
}