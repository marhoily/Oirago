using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows;

namespace Oiraga
{
    public sealed class World : IBalls
    {
        public readonly Dictionary<uint, Ball> 
            Balls = new Dictionary<uint, Ball>();
        public readonly HashSet<Ball> MyBalls = new HashSet<Ball>();

        public IEnumerable<Ball> All => Balls.Values;
        public IEnumerable<Ball> My => MyBalls;
    }

    public interface IBalls
    {
        IEnumerable<Ball> All { get; } 
        IEnumerable<Ball> My { get; } 
    }

    public static class BallsExtension
    {
        public static Point MyAverage(this IBalls balls) => new Point(
            balls.My.Average(b => b.State.X),
            balls.My.Average(b => b.State.Y));

        public static double Zoom(this IBalls balls) => Math.Pow(Math.Min(64.0 /
            balls.My.Sum(x => x.State.Size), 1), 0.1) + .15;
        public static double Zoom04(this IBalls balls) => Math.Pow(Math.Min(64.0 /
            balls.My.Sum(x => x.State.Size), 1), 0.4) + .15;

    }
}