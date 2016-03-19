using System.Collections.Generic;

namespace MyAgario
{
    public sealed class World
    {
        public readonly Dictionary<uint, Ball> Balls = new Dictionary<uint, Ball>();
        public readonly HashSet<Ball> MyBalls = new HashSet<Ball>();
        public Spectate SpectateViewPort = new Spectate(0, 0, 1);
        public WorldSize WorldSize;
    }
}