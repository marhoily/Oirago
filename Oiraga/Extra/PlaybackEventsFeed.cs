using System;
using System.IO;

namespace Oiraga
{
    public sealed class PlaybackEventsFeed : IEventsFeed
    {
        private readonly BinaryReader _stream;

        public PlaybackEventsFeed(BinaryReader stream)
        {
            _stream = stream;
        }

        public void Tick()
        {
            if (_stream.BaseStream.Length == _stream.BaseStream.Position) return;
            var packetLength = _stream.ReadInt32();
            var endPoint = _stream.BaseStream.Position + packetLength;
            //var buffer = _stream.ReadBytes(packetLength);
            //var p = new BinaryReader(new MemoryStream(buffer));
            var msg = _stream.ReadMessage();
            _stream.BaseStream.Seek(endPoint, SeekOrigin.Begin);
            if (msg == null) throw new Exception("buffer of length 0");
            OnEvent?.Invoke(this, msg);
        }
        public event EventHandler<Event> OnEvent;
        public bool IsSynchronous => true;
    }
}