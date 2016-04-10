using System.Collections.Generic;

namespace Oiraga
{
    public sealed class GameState : Balls
    {
        public readonly Dictionary<uint, Ball> 
            AllBalls = new Dictionary<uint, Ball>();
        public readonly HashSet<Ball> MyBalls = new HashSet<Ball>();

        public override IEnumerable<IBall> All => AllBalls.Values;
        public override IEnumerable<IBall> My => MyBalls;
    }
}