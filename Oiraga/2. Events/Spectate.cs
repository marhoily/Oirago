using System.Diagnostics;
using System.Windows;

namespace Oiraga
{
    [DebuggerDisplay("{Center}: {Zoom}")]
    public sealed class Spectate : Event
    {
        public readonly Point Center;
        public readonly double Zoom;

        public Spectate(Point center, double zoom)
        {
            Center = center;
            Zoom = zoom;
        }
    }
}