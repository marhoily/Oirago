namespace MyAgario
{
    public sealed class Spectate : Message
    {
        public readonly double X;
        public readonly double Y;
        public readonly double Zoom;

        public Spectate(double x, double y, double zoom)
        {
            X = x;
            Y = y;
            Zoom = zoom;
        }
    }
}