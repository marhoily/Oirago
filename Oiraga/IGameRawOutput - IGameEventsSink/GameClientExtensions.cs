using System;
using System.Windows.Threading;

namespace Oiraga
{
    public static class GameClientExtensions
    {
        public static void Attach(this IGameRawOutput client, GameMessageDispatcher messageDispatcher, Dispatcher dispatcher)
        {
            if (client.IsSynchronous)
            {
                client.OnMessage += (s, msg) =>
                    messageDispatcher.ProcessMessage(msg);
            }
            else
            {
                client.OnMessage += (s, msg) =>
                    dispatcher.BeginInvoke(new Action(() =>
                        messageDispatcher.ProcessMessage(msg)));
            }
        }
    }
}