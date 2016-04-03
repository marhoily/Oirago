using System;

namespace Oiraga
{
    public interface IEventsFeed
    {
        event EventHandler<Event> OnEvent;
        bool IsSynchronous { get; }
    }
}