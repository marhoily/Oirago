using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows;

namespace Oiraga
{
    public sealed class World
    {
        public readonly Dictionary<uint, Ball> 
            Balls = new Dictionary<uint, Ball>();
        public readonly HashSet<Ball> MyBalls = new HashSet<Ball>();

        public Point MyAverage => new Point(
            MyBalls.Average(b => b.State.X),
            MyBalls.Average(b => b.State.Y));

        public double Zoom => Math.Pow(Math.Min(64.0 / 
            MyBalls.Sum(x => x.State.Size), 1), 0.1) + .15;
        public double Zoom04 => Math.Pow(Math.Min(64.0 / 
            MyBalls.Sum(x => x.State.Size), 1), 0.4) + .15;
    }
}