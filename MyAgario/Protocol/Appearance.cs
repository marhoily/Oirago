namespace MyAgario
{
    public sealed class Appearance
    {
        public readonly uint Id;
        public readonly int X, Y;
        public readonly short Size;
        public readonly byte R, G, B;
        public readonly bool IsVirus;
        public readonly string Name;

        public Appearance(
            uint id, int x, int y, 
            short size, byte r, byte g, byte b, 
            bool isVirus, string name)
        {
            Id = id;
            X = x;
            Y = y;
            Size = size;
            R = r;
            G = g;
            B = b;
            IsVirus = isVirus;
            Name = name;
        }
    }
}