using System;

namespace Oiraga
{
    public interface IGameRawOutut
    {
        event EventHandler<Message> OnMessage;
        bool IsSynchronous { get; }
    }
}