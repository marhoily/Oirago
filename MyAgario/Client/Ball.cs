namespace MyAgario
{
    public class Ball
    {
        public byte B;
        public byte G;
        public bool IsVirus;

        public bool Mine;
        public string Nick;
        public byte R;
        public short Size;
        public int X;
        public int Y;

        public void SetCoordinates(int x, int y)
        {
            X = x;
            Y = y;
        }
    }
}