using System;
using System.IO;
using System.Windows.Threading;

namespace MyAgario
{
    public class AgarioPlayback
    {
        public AgarioPlayback(IWindowAdapter windowAdapter, World world)
        {
            var processor = new WorldChangeMessageProcessor(windowAdapter, world);
            var p = new Packet(File.ReadAllBytes("rec.bin"));
            GC.KeepAlive(new DispatcherTimer(
                TimeSpan.FromMilliseconds(40),
                DispatcherPriority.Normal,
                (s, e) =>
                {
                    var msg = p.ReadMessage();
                    if (msg == null) Console.WriteLine("buffer of length 0");
                    else processor.ProcessMessage(msg);
                }, Dispatcher.CurrentDispatcher));
        }
    }
}