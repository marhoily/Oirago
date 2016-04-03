using System;
using System.IO;
using System.Windows.Threading;

namespace Oiraga
{
    public class PlaybackPlayServerConnection : IPlayServerConnection
    {
        private readonly BinaryReader _stream;
        private readonly DispatcherTimer _timer;
        private readonly PlaybackEventsFeed _eventsFeed;

        public PlaybackPlayServerConnection()
        {
            _stream = new BinaryReader(File.OpenRead("rec.bin"));
            _timer = new DispatcherTimer(
                TimeSpan.FromMilliseconds(10),
                DispatcherPriority.Normal,
                Tick, Dispatcher.CurrentDispatcher);
            Input = new NullCommandsSink();
            _eventsFeed = new PlaybackEventsFeed(_stream);
        }

        private void Tick(object s, EventArgs e)
        {
            for (var i = 0; i < 1; i++)
                _eventsFeed.Tick();
        }

        public void Dispose()
        {
            _timer.IsEnabled = false;
            _stream.Dispose();
        }

        public ICommandsSink Input { get; }
        public IEventsFeed Output => _eventsFeed;
    }
}