namespace MyAgario
{
    public sealed class Camera
    {
        public double Zoom { get; }
        public double X { get; }
        public double Y { get; }

        public Camera(double zoom,  double x,  double y)
        {
            Zoom = zoom;
            X = x;
            Y = y;
        }

        public static Camera Middle(double t, Camera p, Camera c)
        {
            p = p ?? c;
            var u = 1-t;
            return new Camera(
                u*p.Zoom + t*c.Zoom,
                u*p.X + t*c.X, 
                u*p.Y + t*c.Y);
        }

        public override string ToString()
        {
            return $"{Zoom:f2},{X:f2},{Y:f2}";
        }
    }
}