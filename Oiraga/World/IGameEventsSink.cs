using System.Collections.Generic;
using System.Windows;
using static Oiraga.Message;

namespace Oiraga
{
    public interface IGameEventsSink 
    {
        void Appears(IBall newGuy);
        void Eats(IBall eater, IBall eaten);
        void Remove(IBall dying);
        void AfterTick(IBalls balls);
        void Leaders(IEnumerable<string> leaders);
        void WorldSize(Rect viewPort);
    }
}