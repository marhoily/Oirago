using System;
using System.IO;
using System.Threading.Tasks;

namespace Oiraga
{
    public sealed class PlaybackEventsFeed : IEventsFeed
    {
        private readonly BinaryReader _stream;

        public PlaybackEventsFeed(BinaryReader stream)
        {
            _stream = stream;
        }
        public Task<Event> NextEvent()
        {
            if (_stream.BaseStream.Length == _stream.BaseStream.Position)
                return new TaskCompletionSource<Event>().Task;
            var packetLength = _stream.ReadInt32();
            var endPoint = _stream.BaseStream.Position + packetLength;
            var msg = _stream.ReadMessage();
            _stream.BaseStream.Seek(endPoint, SeekOrigin.Begin);
            return Task.FromResult(msg);
        }
    }
}