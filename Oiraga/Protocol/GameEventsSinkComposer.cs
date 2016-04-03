using System.Collections.Generic;
using System.Windows;

namespace Oiraga
{
    public sealed class GameEventsSinkComposer : IGameEventsSink
    {
        public List<IGameEventsSink> Listeners { get; } = new List<IGameEventsSink>();

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

        public void AfterTick(World world)
        {
            foreach (var windowAdapter in Listeners)
                windowAdapter.AfterTick(world);
        }

        public void Leaders(Message.LeadersBoard leadersBoard)
        {
            foreach (var windowAdapter in Listeners)
                windowAdapter.Leaders(leadersBoard);
        }

        public void WorldSize(Rect viewPort)
        {
            foreach (var windowAdapter in Listeners)
                windowAdapter.WorldSize(viewPort);
        }
    }
}