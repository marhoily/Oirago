using System.Windows;
using static Oiraga.Message;

namespace Oiraga
{
    public interface IGameEventsSink : ILog
    {
        void Appears(Ball newGuy);
        void Eats(Ball eater, Ball eaten);
        void Remove(Ball dying);
        void AfterTick();
        void Leaders(LeadersBoard leadersBoard);
        void WorldSize(Rect viewPort);
    }
}