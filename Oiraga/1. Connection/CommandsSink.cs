using System.IO;
using System.Linq;
using System.Text;
using WebSocketSharp;

namespace Oiraga
{
    public sealed class CommandsSink : ICommandsSink
    {
        private readonly WebSocket _ws;

        public CommandsSink(WebSocket ws) { _ws = ws; }

        public void Spawn(string name) =>
            _ws.Send(new byte[] { 0 }
                .Concat(Encoding.Unicode.GetBytes(name))
                .ToArray());

        public void MoveTo(double x, double y)
        {
            var buf = new byte[13];
            var writer = new BinaryWriter(new MemoryStream(buf));
            writer.Write((byte)16);
            writer.Write((int)x);
            writer.Write((int)y);
            _ws.Send(buf);
        }
        public void Spectate() => _ws.Send(new byte[] { 1 });
        public void Split() => _ws.Send(new byte[] { 17 });
        public void Eject() => _ws.Send(new byte[] { 21 });
    }
}