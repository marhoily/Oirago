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
}