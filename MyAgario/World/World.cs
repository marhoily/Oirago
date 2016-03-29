using System.Collections.Generic;
using System.Linq;
using System.Windows;
using static System.Math;
using static MyAgario.Message;

namespace MyAgario
{
    public sealed class World
    {
        public readonly Dictionary<uint, Ball> 
            Balls = new Dictionary<uint, Ball>();
        public readonly HashSet<Ball> MyBalls = new HashSet<Ball>();
        public Spectate SpectateViewPort = new Spectate(0, 0, 1);
        public WorldSize WorldSize;

        public Point MyAverage => new Point(
            MyBalls.Average(b => b.State.X),
            MyBalls.Average(b => b.State.Y));

        public double Zoom => Pow(Min(64.0 / 
            MyBalls.Sum(x => x.State.Size), 1), 0.1) + .15;
        public double Zoom04 => Pow(Min(64.0 / 
            MyBalls.Sum(x => x.State.Size), 1), 0.4);
    }
}