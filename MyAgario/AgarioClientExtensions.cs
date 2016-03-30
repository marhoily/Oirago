using System;
using System.Threading.Tasks;
using System.Windows.Threading;

namespace MyAgario
{
    public static class AgarioClientExtensions
    {
        public static Task<TMessage> GetMessageAsync<TMessage>(this IAgarioClient client)
            where TMessage : Message
        {
            var s = new TaskCompletionSource<TMessage>();
            client.OnMessage += (sender, msg) =>
            {
                var result = msg as TMessage;
                if (result == null) return;
                s.TrySetResult(result);
                client.Dispose();
            };
            return s.Task;
        }

        public static void Attach(this IAgarioClient client, GameMessageProcessor processor, Dispatcher dispatcher)
        {
            client.OnMessage += (s, msg) =>
                dispatcher.BeginInvoke(new Action(() =>
                    processor.ProcessMessage(msg)));
        }
    }
}