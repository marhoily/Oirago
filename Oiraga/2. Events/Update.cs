using System.Windows;
using System.Windows.Media;

namespace Oiraga
{
    public sealed class Update
    {
        public readonly uint Id;
        public readonly Point Pos;
        public readonly short Size;
        public readonly Color Color;
        public readonly bool IsVirus;
        public readonly string Name;

        public Update(uint id, Point pos, short size, 
            Color color, bool isVirus, string name)
        {
            Id = id;
            Pos = pos;
            Size = size;
                
            IsVirus = isVirus;
            Name = name;
            Color = color;
        }
    }
}