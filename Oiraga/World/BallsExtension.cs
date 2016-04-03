using System;
using System.Linq;
using System.Windows;

namespace Oiraga
{
    public static class BallsExtension
    {
        public static Point MyAverage(this IBalls balls) => new Point(
            balls.My.Average(b => b.X),
            balls.My.Average(b => b.Y));

        public static double Zoom(this IBalls balls) => Math.Pow(Math.Min(64.0 /
                                                                          balls.My.Sum(x => x.Size), 1), 0.1) + .15;
        public static double Zoom04(this IBalls balls) => Math.Pow(Math.Min(64.0 /
                                                                            balls.My.Sum(x => x.Size), 1), 0.4) + .15;

    }
}