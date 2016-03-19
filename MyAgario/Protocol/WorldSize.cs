using System.Diagnostics;

namespace MyAgario
{
    [DebuggerDisplay("{MinX}..{MaxX}, {MinY}..{MaxY}")]
    public sealed class WorldSize : Message
    {
        public readonly double MaxX;
        public readonly double MaxY;
        public readonly double MinX;
        public readonly double MinY;

        public WorldSize(double maxX, double maxY, double minX, double minY)
        {
            MaxX = maxX;
            MaxY = maxY;
            MinX = minX;
            MinY = minY;
        }
    }
}