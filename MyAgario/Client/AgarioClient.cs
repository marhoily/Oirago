using System;
using System.IO;
using System.Text;
using System.Windows.Threading;
using WebSocketSharp;

namespace MyAgario
{
    public interface IAgarioClient
    {
        void Spawn(string name);
        void MoveTo(double x, double y);
        void Spectate();
        void Split();
        void Eject();
        event EventHandler<Message> OnMessage;
    }

    public sealed class AgarioClient : IAgarioClient
    {
        private readonly IWindowAdapter _windowAdapter;
        private readonly AgarioRecorder _agarioRecorder;
        private readonly WebSocket _ws;

        public AgarioClient(IWindowAdapter windowAdapter,
            AgarioRecorder agarioRecorder, ServerConnection connection)
        {
            _windowAdapter = windowAdapter;
            _agarioRecorder = agarioRecorder;

            _ws = connection.ToWebSocket(_windowAdapter);
            _ws.OnMessage += OnMessageReceived;
            _ws.Connect();
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


        private void OnMessageReceived(object sender, EventArgs e)
        {
            var rawData = ((MessageEventArgs)e).RawData;
            _agarioRecorder.Save(rawData);
            var p = new Packet(rawData);
            var msg = p.ReadMessage();
            if (msg == null) _windowAdapter.Error("buffer of length 0");
            else OnMessage?.Invoke(this, msg);
        }

        public event EventHandler<Message> OnMessage;
    }
}