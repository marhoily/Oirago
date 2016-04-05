using System;
using System.Threading.Tasks;

namespace Oiraga
{
    public interface IEventsFeed
    {
        Task<Event> NextEvent();
    }
}