using System.Collections.Generic;

namespace Oiraga
{
    public sealed class Balls : IBalls
    {
        public readonly Dictionary<uint, Ball> 
            All = new Dictionary<uint, Ball>();
        public readonly HashSet<Ball> My = new HashSet<Ball>();

        IEnumerable<IBall> IBalls.All => All.Values;
        IEnumerable<IBall> IBalls.My => My;
    }
}