using static MyAgario.Message;

namespace MyAgario
{
    public interface IWindowAdapter
    {
        void Appears(Ball newGuy);
        //void Update(Ball newGuy);
        void Eats(Ball eater, Ball eaten);
        void Remove(Ball dying);
        void AfterTick();
        void Error(string message);
        void Leaders(LeadersBoard leadersBoard);
    }
}