using System;
using System.Threading.Tasks;

namespace Oiraga
{
    public static class EventsFeedExtensions
    {
        public static async Task Attach(this IEventsFeed client, EventDispatcher eventDispatcher)
        {
            while (true)
            {
                //await Task.Delay(TimeSpan.FromMilliseconds(40));
               // for (var i = 0; i < 10; i++)
                    eventDispatcher.Dispatch(await client.NextEvent());
            }
            // ReSharper disable once FunctionNeverReturns
        }
    }
}