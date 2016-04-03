using System;
using System.Windows.Threading;

namespace Oiraga
{
    public static class GameClientExtensions
    {
        public static void Attach(this IGameRawOutput client, EventDispatcher eventDispatcher, Dispatcher wpfDispatcher)
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