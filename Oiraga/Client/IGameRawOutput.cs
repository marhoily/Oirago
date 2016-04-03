using System;

namespace Oiraga
{
    public interface IGameRawOutput
    {
        event EventHandler<Event> OnEvent;
        bool IsSynchronous { get; }
    }
}