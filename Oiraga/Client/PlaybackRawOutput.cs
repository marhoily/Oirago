using System;
using System.IO;

namespace Oiraga
{
    public sealed class PlaybackRawOutput : IGameRawOutut
    {
        private readonly BinaryReader _stream;

        public PlaybackRawOutput(BinaryReader stream)
        {
            _stream = stream;
        }

        public void Tick()
        {
            if (_stream.BaseStream.Length == _stream.BaseStream.Position) return;
            var packetLength = _stream.ReadInt32();
            var p = new Packet(_stream.ReadBytes(packetLength));
            var msg = p.ReadMessage();
            if (msg == null) throw new Exception("buffer of length 0");
            OnMessage?.Invoke(this, msg);
        }
        public event EventHandler<Message> OnMessage;
        public bool IsSynchronous => true;
    }
}