using System.Collections.Generic;
using System.Linq;
using System.Windows;

namespace Oiraga
{
    public sealed class ReceiverComposer : IReceiver
    {
        public List<IReceiver> Listeners { get; } = new List<IReceiver>();

        public void Appears(IBall newGuy)
        {
            foreach (var windowAdapter in Listeners)
                windowAdapter.Appears(newGuy);
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
            var arr = leaders.ToArray();
            foreach (var windowAdapter in Listeners)
                windowAdapter.Leaders(arr);
        }

        public void WorldSize(Rect viewPort)
        {
            foreach (var windowAdapter in Listeners)
                windowAdapter.WorldSize(viewPort);
        }
    }
}