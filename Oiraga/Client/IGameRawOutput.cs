using System;

namespace Oiraga
{
    public interface IGameRawOutput
    {
        event EventHandler<Message> OnMessage;
        bool IsSynchronous { get; }
    }
}