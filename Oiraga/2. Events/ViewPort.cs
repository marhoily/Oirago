using System.Diagnostics;

namespace Oiraga
{
    [DebuggerDisplay("{MinX}..{MaxX}, {MinY}..{MaxY}")]
    public sealed class ViewPort : Event
    {
        public readonly double MaxX;
        public readonly double MaxY;
        public readonly double MinX;
        public readonly double MinY;

        public ViewPort(double maxX, double maxY, double minX, double minY)
        {
            MaxX = maxX;
            MaxY = maxY;
            MinX = minX;
            MinY = minY;
        }
    }
}