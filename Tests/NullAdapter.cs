using System.Windows;
using Oiraga;

namespace Tests
{
    public sealed class NullAdapter : IGameEventsSink
    {
        public IBalls Balls { get; private set; }
        public void Appears(Ball newGuy) { }
        public void Eats(Ball eater, Ball eaten) { } 
        public void Remove(Ball dying) { }
        public void AfterTick(IBalls balls) => Balls = balls;
        public void Leaders(Message.LeadersBoard leadersBoard) { }
        public void WorldSize(Rect viewPort) {  }
    }
}