using System;
using System.Windows.Threading;

namespace Oiraga
{
    public static class EventsFeedExtensions
    {
        public static void Attach(this IEventsFeed client, EventDispatcher eventDispatcher, Dispatcher wpfDispatcher)
        {
            if (client.IsSynchronous)
            {
                client.OnEvent += (s, msg) =>
                    eventDispatcher.Dispatch(msg);
            }
            else
            {
                client.OnEvent += (s, msg) =>
                    wpfDispatcher.BeginInvoke(new Action(() =>
                        eventDispatcher.Dispatch(msg)));
            }
        }
    }
}