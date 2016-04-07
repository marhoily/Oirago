using System;
using System.IO;

namespace Oiraga
{
    public class PlaybackPlayServerConnection : IPlayServerConnection, IDisposable
    {
        private readonly BinaryReader _stream;
        private readonly PlaybackEventsFeed _eventsFeed;

        public PlaybackPlayServerConnection()
        {
            _stream = new BinaryReader(File.OpenRead("rec.bin"));
            _eventsFeed = new PlaybackEventsFeed(_stream);
        }

        public void Dispose() => _stream.Dispose();
        public ICommandsSink Input { get; } = new NullCommandsSink();
        public IEventsFeed Output => _eventsFeed;
    }
}