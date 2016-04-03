using System;
using System.Threading.Tasks;
using System.Windows.Threading;

namespace Oiraga
{
    public static class GameClientExtensions
    {
        public static void Attach(this IGameRawOutput client, GameMessageProcessor processor, Dispatcher dispatcher)
        {
            if (client.IsSynchronous)
            {
                client.OnMessage += (s, msg) =>
                    processor.ProcessMessage(msg);
            }
            else
            {
                client.OnMessage += (s, msg) =>
                    dispatcher.BeginInvoke(new Action(() =>
                        processor.ProcessMessage(msg)));
            }
        }
    }
}