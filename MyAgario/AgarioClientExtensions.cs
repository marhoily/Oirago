using System;
using System.Windows.Threading;

namespace MyAgario
{
    public static class AgarioClientExtensions
    {
        public static void Attach(this IAgarioClient client, MessageProcessor processor, Dispatcher dispatcher)
        {
            client.OnMessage += (s, msg) =>
                dispatcher.BeginInvoke(new Action(() =>
                    processor.ProcessMessage(msg)));
        }
    }
}