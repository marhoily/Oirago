using System.Windows;
using Oiraga;

namespace Tests
{
    public sealed class NullAdapter : IGameEventsSink
    {
        public World World { get; private set; }
        public void Appears(Ball newGuy) { }
        public void Eats(Ball eater, Ball eaten) { } 
        public void Remove(Ball dying) { }
        public void AfterTick(World world) => World = world;
        public void Error(string message) { } 
        public void Leaders(Message.LeadersBoard leadersBoard) { }
        public void WorldSize(Rect viewPort) {  }
    }
}