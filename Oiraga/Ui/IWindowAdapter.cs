using static Oiraga.Message;

namespace Oiraga
{
    public interface ILog
    {
        void Error(string message);
    }
    public interface IWindowAdapter : ILog
    {
        void Appears(Ball newGuy);
        void Eats(Ball eater, Ball eaten);
        void Remove(Ball dying);
        void AfterTick();
        void Leaders(LeadersBoard leadersBoard);
        void WorldSize(ViewPort viewPort);
    }
}