using System;
using System.IO;
using WebSocketSharp;

namespace Oiraga
{
    public sealed class GameInput : IGameInput
    {
        private readonly WebSocket _ws;

        public GameInput(WebSocket ws)
        {
            _ws = ws;
        }

        public void Spawn(string name)
        {
            var buf = new byte[1 + 2 * name.Length];
            buf[0] = 0;

            for (var i = 0; i < name.Length; i++)
            {
                buf[2 * i + 1] = (byte)name[i];
                buf[2 * i + 2] = 0;
            }
            _ws.Send(buf);
        }
        public void MoveTo(double x, double y)
        {
            var buf = new byte[13];
            var writer = new BinaryWriter(new MemoryStream(buf));
            writer.Write((byte)16);
            writer.Write((int)x);
            writer.Write((int)y);
            //writer.Write(0);
            _ws.Send(buf);
        }
        public void Spectate() { _ws.Send(new byte[] { 1 }); }
        public void Split() { _ws.Send(new byte[] { 17 }); }
        public void Eject() { _ws.Send(new byte[] { 21 }); }
    }

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

    public sealed class GameClient : IGameClient
    {
        private readonly ServerConnection _connection;
        private readonly WebSocket _ws;
        public IGameInput Input { get; }
        public IGameRawOutut RawOutut { get; }

        public GameClient(ILog log,
            GameRecorder recorder, ServerConnection connection)
        {
            _connection = connection;
            _ws = connection.ToWebSocket(log);
            Input = new GameInput(_ws);
            RawOutut = new GameRawOutput(log, recorder, _ws);
            _ws.Connect();
        }

        public void Dispose()
        {
            _connection.Dispose();
            _ws.Close();
        }
    }
}