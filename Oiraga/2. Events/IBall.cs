using System.Windows;
using System.Windows.Media;

namespace Oiraga
{
    public interface IBall
    {
        bool IsMine { get; }
        Point Pos { get; }
        short Size { get; }
        Color Color { get; }
        bool IsVirus { get; }
        string Name { get; }
    }
}