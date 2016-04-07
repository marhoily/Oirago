using System;
using System.Threading.Tasks;

namespace Oiraga
{
    public interface IEventsFeed : IDisposable
    {
        Task<Event> NextEvent();
    }
}