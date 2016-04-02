namespace Oiraga
{
    public interface IWindowAdapter
    {
        void Appears(Ball newGuy);
        void Eats(Ball eater, Ball eaten);
        void Remove(Ball dying);
        void AfterTick();
        void Error(string message);
        void Leaders(Message.LeadersBoard leadersBoard);
        void WorldSize(Message.ViewPort viewPort);
    }
}