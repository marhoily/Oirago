using System.Windows;
using System.Windows.Media;

namespace Oiraga
{
    public sealed class Ball : IBall
    {
        public bool IsMine { get; }
        public Point Pos { get; set; }
        public short Size { get; set; }
        public Color Color { get; set; }
        public bool IsVirus { get; set; }
        public string Name { get; set; }

        public Ball(bool isMine) { IsMine = isMine; }
    }
}