using System.Collections.Generic;
using System.Windows;

namespace Oiraga
{
    public interface IReceiver 
    {
        void Appears(IBall newGuy);
        void Eats(IBall eater, IBall eaten);
        void Remove(IBall dying);
        void AfterTick(IBalls balls);
        void Leaders(IEnumerable<string> leaders);
        void WorldSize(Rect viewPort);
    }
}