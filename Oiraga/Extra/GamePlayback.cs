using System;
using System.IO;
using System.Windows.Threading;

namespace Oiraga
{
    public class GamePlayback : IPlayServerConnection
    {
        private readonly BinaryReader _stream;
        private readonly DispatcherTimer _timer;
        private readonly PlaybackRawOutput _rawOutput;

        public GamePlayback()
        {
            _stream = new BinaryReader(File.OpenRead("rec.bin"));
            _timer = new DispatcherTimer(
                TimeSpan.FromMilliseconds(10),
                DispatcherPriority.Normal,
                Tick, Dispatcher.CurrentDispatcher);
            Input = new NullInput();
            _rawOutput = new PlaybackRawOutput(_stream);
        }

        private void Tick(object s, EventArgs e)
        {
            for (var i = 0; i < 1; i++)
                _rawOutput.Tick();
        }

        public void Dispose()
        {
            _timer.IsEnabled = false;
            _stream.Dispose();
        }

        public ICommandsSink Input { get; }
        public IEventsFeed RawOutput => _rawOutput;
    }
}