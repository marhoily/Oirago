using System.Windows;
using Oiraga;

namespace Tests
{
    public sealed class NullAdapter : IGameEventsSink
    {
        public void Appears(Ball newGuy)
        {
        }

        public void Update(Ball newGuy)
        {
        }

        public void Eats(Ball eater, Ball eaten)
        {
        }

        public void Remove(Ball dying)
        {
        }

        public void AfterTick()
        {
            
        }

        public void Error(string message)
        {
        }

        public void Leaders(Message.LeadersBoard leadersBoard)
        {
            

        }

        public void WorldSize(Rect viewPort)
        {
            
        }
    }
}