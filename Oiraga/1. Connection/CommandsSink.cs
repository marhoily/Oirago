using System;
using System.IO;
using System.Linq;
using System.Text;

namespace Oiraga
{
    public sealed class CommandsSink : ICommandsSink
    {
        private readonly Action<byte[]> _send;

        public CommandsSink(Action<byte[]> send)
        {
            _send = send;
        }

        public void Spawn(string name) =>
            _send(new byte[] { 0 }
                .Concat(Encoding.Unicode.GetBytes(name))
                .ToArray());

        public void MoveTo(double x, double y)
        {
            var buf = new byte[13];
            var writer = new BinaryWriter(new MemoryStream(buf));
            writer.Write((byte)16);
            writer.Write((int)x);
            writer.Write((int)y);
            _send(buf);
        }
        public void Spectate() => _send(new byte[] { 1 });
        public void Split() => _send(new byte[] { 17 });
        public void Eject() => _send(new byte[] { 21 });
    }
}