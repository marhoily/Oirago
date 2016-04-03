using System.Windows.Media;

namespace Oiraga
{
    public sealed class Ball
    {
        public readonly bool IsMine;
        public int X, Y;
        public short Size;
        public Color Color;
        public bool IsVirus;
        public string Name;
        public bool IsFood => Size < 30;

        public Ball(bool isMine) { IsMine = isMine; }

        public void Update(int x, int y, short size,
                Color color, bool isVirus, string name)
        {
            X = x;
            Y = y;
            Size = size;
            Color = color;
            IsVirus = isVirus;
            if (!string.IsNullOrEmpty(name))
                Name = name;
        }
    }
}