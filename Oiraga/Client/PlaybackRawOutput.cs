using System;
using System.IO;

namespace Oiraga
{
    public sealed class PlaybackRawOutput : IGameRawOutput
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
            var buffer = _stream.ReadBytes(packetLength);
            var p = new BinaryReader(new MemoryStream(buffer));
            var msg = p.ReadMessage();
            if (msg == null) throw new Exception("buffer of length 0");
            OnEvent?.Invoke(this, msg);
        }
        public event EventHandler<Event> OnEvent;
        public bool IsSynchronous => true;
    }
}