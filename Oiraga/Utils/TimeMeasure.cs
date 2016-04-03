using System.Diagnostics;
using System.Linq;

namespace Oiraga
{
    class TimeMeasure
    {
        private readonly CircularBuffer<double> _prevFramesLengthsMs = new CircularBuffer<double>(10);
        private readonly CircularBuffer<int> _prevFrameRates = new CircularBuffer<int>(10);
        private readonly Stopwatch _stopwatch = Stopwatch.StartNew();
        private double _averageFrameLength;
        private int _frameRate;

        public void Tick()
        {
            _prevFramesLengthsMs.Enqueue(_stopwatch.Elapsed.TotalMilliseconds);
            _stopwatch.Restart();
            _prevFrameRates.Enqueue(_frameRate);
            _frameRate = 0;
            _averageFrameLength = _prevFramesLengthsMs.Average();
        }
        public double Frame()
        {
            _frameRate++;
            return _stopwatch.Elapsed.TotalMilliseconds 
                   / _averageFrameLength;
        }
    }
}