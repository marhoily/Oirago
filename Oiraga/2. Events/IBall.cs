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
}