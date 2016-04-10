using System.Collections.Generic;
using System.Windows;

namespace Oiraga
{
    public interface IReceiver 
    {
        void Appears(IBall newGuy);
        void Remove(IBall dying);
        void AfterTick(Balls balls);
        void Leaders(IEnumerable<string> leaders);
        void WorldSize(Rect viewPort);
        void Spectate(Balls balls, Point center, double zoom);
    }
}