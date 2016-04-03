using System.Linq;
using System.Windows;
using static System.Math;

namespace Oiraga
{
    public static class BallsExtension
    {
        public static Point MyAverage(this IBalls balls)
            => balls.My.Average(x => x.Pos);

        public static double Zoom(this IBalls balls) => balls.Calc(.1);
        public static double Zoom04(this IBalls balls) => balls.Calc(.4);

        private static double Calc(this IBalls balls, double pow) =>
            Pow(Min(64.0 / balls.My.Sum(x => x.Size), 1), pow) + .15;

    }
}