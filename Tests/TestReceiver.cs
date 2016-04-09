using System.Collections.Generic;
using System.Windows;
using Oiraga;

namespace Tests
{
    public sealed class TestReceiver : IReceiver
    {
        public IBalls Balls { get; private set; }
        public void Appears(IBall newGuy) { }
        public void Remove(IBall dying) { }
        public void AfterTick(IBalls balls) => Balls = balls;
        public void Leaders(IEnumerable<string> leaders) { }
        public void WorldSize(Rect viewPort) {  }
    }
}