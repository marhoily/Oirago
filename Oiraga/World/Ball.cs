using System.Windows.Media;

namespace Oiraga
{
    public interface IBall
    {
        bool IsMine { get; }
        int X { get; }
        int Y { get; }
        short Size { get; }
        Color Color { get; }
        bool IsVirus { get; }
        string Name { get; }
    }

    public static class BallExtensions
    {
        public static bool IsFood(this IBall ball) => ball.Size < 30;

    }
    public sealed class Ball : IBall
    {
        public bool IsMine { get; }
        public int X { get; private set; }
        public int Y { get; private set; }
        public short Size { get; private set; }
        public Color Color { get; private set; }
        public bool IsVirus { get; private set; }
        public string Name { get; private set; }

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