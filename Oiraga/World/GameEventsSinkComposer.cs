using System.Collections.Generic;
using System.Windows;

namespace Oiraga
{
    public sealed class GameEventsSinkComposer : IGameEventsReceiver
    {
        public List<IGameEventsReceiver> Listeners { get; } = new List<IGameEventsReceiver>();

        public void Appears(IBall newGuy)
        {
            foreach (var windowAdapter in Listeners)
                windowAdapter.Appears(newGuy);
        }

        public void Eats(IBall eater, IBall eaten)
        {
            foreach (var windowAdapter in Listeners)
                windowAdapter.Eats(eater, eaten);
        }

        public void Remove(IBall dying)
        {
            foreach (var windowAdapter in Listeners)
                windowAdapter.Remove(dying);
        }

        public void AfterTick(IBalls balls)
        {
            foreach (var windowAdapter in Listeners)
                windowAdapter.AfterTick(balls);
        }

        public void Leaders(IEnumerable<string> leaders)
        {
            foreach (var windowAdapter in Listeners)
                windowAdapter.Leaders(leaders);
        }

        public void WorldSize(Rect viewPort)
        {
            foreach (var windowAdapter in Listeners)
                windowAdapter.WorldSize(viewPort);
        }
    }
}