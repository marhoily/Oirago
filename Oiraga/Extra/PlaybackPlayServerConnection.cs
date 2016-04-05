using System.IO;

namespace Oiraga
{
    public class PlaybackPlayServerConnection : IPlayServerConnection
    {
        private readonly BinaryReader _stream;
        private readonly PlaybackEventsFeed _eventsFeed;

        public PlaybackPlayServerConnection()
        {
            _stream = new BinaryReader(File.OpenRead("rec.bin"));
            Input = new NullCommandsSink();
            _eventsFeed = new PlaybackEventsFeed(_stream);
        }

        public void Dispose() => _stream.Dispose();

        public ICommandsSink Input { get; }
        public IEventsFeed Output => _eventsFeed;
    }
}