using System;

namespace Oiraga
{
    public interface IPlayServerConnection : IDisposable
    {
        ICommandsSink Input { get; }
        IEventsFeed Output { get; }
    }
}