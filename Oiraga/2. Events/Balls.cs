using System.Collections.Generic;
using System.Linq;
using System.Windows;
using static System.Math;

namespace Oiraga
{
    public abstract class Balls
    {
        public abstract IEnumerable<IBall> All { get; }
        public abstract IEnumerable<IBall> My { get; }
        public Point MyAverage => My.Average(x => x.Pos);
        public double Zoom => Calc(.1);
        public double Zoom04 => Calc(.4);
        private double Calc(double pow) =>
            Pow(Min(64.0 / My.Sum(x => x.Size), 1), pow) + .15;
    }
}