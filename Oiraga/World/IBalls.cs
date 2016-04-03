using System.Collections.Generic;

namespace Oiraga
{
    public interface IBalls
    {
        IEnumerable<IBall> All { get; } 
        IEnumerable<IBall> My { get; } 
    }
}