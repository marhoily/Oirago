using System.Windows;
using System.Windows.Media;

namespace Oiraga
{
    public sealed class Ball : IBall
    {
        public bool IsMine { get; }
        public Point Pos { get; private set; }
        public short Size { get; private set; }
        public Color Color { get; private set; }
        public bool IsVirus { get; private set; }
        public string Name { get; private set; }

        public Ball(bool isMine) { IsMine = isMine; }

        public void Update(Point pos, short size,
                Color color, bool isVirus, string name)
        {
            Pos = pos;
            Size = size;
            Color = color;
            IsVirus = isVirus;
            if (!string.IsNullOrEmpty(name))
                Name = name;
        }
    }
}