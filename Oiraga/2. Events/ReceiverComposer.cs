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
            foreach (var receiver in Listeners)
                receiver.Appears(newGuy);
        }

        public void Remove(IBall dying)
        {
            foreach (var receiver in Listeners)
                receiver.Remove(dying);
        }

        public void AfterTick(IBalls balls)
        {
            foreach (var receiver in Listeners)
                receiver.AfterTick(balls);
        }

        public void Leaders(IEnumerable<string> leaders)
        {
            var arr = leaders.ToArray();
            foreach (var receiver in Listeners)
                receiver.Leaders(arr);
        }

        public void WorldSize(Rect viewPort)
        {
            foreach (var receiver in Listeners)
                receiver.WorldSize(viewPort);
        }

        public void Spectate(IBalls balls, Point center, double zoom)
        {
            foreach (var receiver in Listeners)
                receiver.Spectate(balls, center, zoom);
        }
    }
}