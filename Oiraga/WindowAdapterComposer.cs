using System.Collections.Generic;

namespace Oiraga
{
    public sealed class WindowAdapterComposer : IWindowAdapter
    {
        public List<IWindowAdapter> Listeners { get; } = new List<IWindowAdapter>();
        public void Error(string message)
        {
            foreach (var windowAdapter in Listeners)
                windowAdapter.Error(message);
        }

        public void Appears(Ball newGuy)
        {
            foreach (var windowAdapter in Listeners)
                windowAdapter.Appears(newGuy);
        }

        public void Eats(Ball eater, Ball eaten)
        {
            foreach (var windowAdapter in Listeners)
                windowAdapter.Eats(eater, eaten);
        }

        public void Remove(Ball dying)
        {
            foreach (var windowAdapter in Listeners)
                windowAdapter.Remove(dying);
        }

        public void AfterTick()
        {
            foreach (var windowAdapter in Listeners)
                windowAdapter.AfterTick();
        }

        public void Leaders(Message.LeadersBoard leadersBoard)
        {
            foreach (var windowAdapter in Listeners)
                windowAdapter.Leaders(leadersBoard);
        }

        public void WorldSize(Message.ViewPort viewPort)
        {
            foreach (var windowAdapter in Listeners)
                windowAdapter.WorldSize(viewPort);
        }
    }
}