using System;

namespace Oiraga
{
    public interface IPlayServerConnection : IDisposable
    {
        ISendCommand Input { get; }
        IEventsFeed Output { get; }
    }
}