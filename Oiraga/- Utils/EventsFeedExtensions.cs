using System;
using System.Threading.Tasks;
using System.Windows.Threading;

namespace Oiraga
{
    public static class EventsFeedExtensions
    {
        public static async Task Attach(this IEventsFeed client, EventDispatcher eventDispatcher, Dispatcher wpfDispatcher)
        {
            while (true)
            {
                await Task.Delay(TimeSpan.FromMilliseconds(1));
                for (int i = 0; i < 10; i++)
                    eventDispatcher.Dispatch(await client.NextEvent());
            }
        }
    }
}