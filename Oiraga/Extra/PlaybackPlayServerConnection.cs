using System.IO;

namespace Oiraga
{
    public class PlaybackPlayServerConnection : IPlayServerConnection
    {
        private readonly PlaybackEventsFeed _eventsFeed;

        public PlaybackPlayServerConnection()
        {
            _eventsFeed = new PlaybackEventsFeed(
                new BinaryReader(File.OpenRead("rec.bin")));
        }

        public void Dispose() => _eventsFeed.Dispose();
        public ICommandsSink Input { get; } = new NullCommandsSink();
        public IEventsFeed Output => _eventsFeed;
    }
}