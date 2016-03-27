using System;
using System.IO;
using System.Text;
using System.Windows.Threading;
using WebSocketSharp;

namespace MyAgario
{
    public class AgarioClient
    {
        private readonly ServerCredentials _credentials;
        private readonly WorldChangeMessageProcessor _worldChangeMessageProcessor;

        private readonly WebSocket _ws;
        private readonly Dispatcher _dispatcher;
        private FileStream _fileStream = File.Create("rec.bin");

        public AgarioClient(IWindowAdapter windowAdapter, World world)
        {
            _dispatcher = Dispatcher.CurrentDispatcher;
            Console.WriteLine(BitConverter.IsLittleEndian);
            _worldChangeMessageProcessor = new WorldChangeMessageProcessor(windowAdapter, world);
            _credentials = Servers.GetFfaServer();
            
            Console.WriteLine("Server {0}", _credentials.Server);
            Console.WriteLine("Key {0}", _credentials.Key);
            
            var uri = "ws://" + _credentials.Server;
            Console.WriteLine(uri);
            
            _ws = new WebSocket(uri) { Origin = "http://agar.io" };
            _ws.OnOpen += OnOpen;
            _ws.OnError += (s, e) => Console.WriteLine("OnError");
            _ws.OnMessage += OnMessageReceived;
            _ws.OnClose += (s, e) => Console.WriteLine("OnClose");
            _ws.Connect();
        }


        public void Spawn(string name)
        {
            var buf = new byte[1 + 2 * name.Length];
            buf[0] = 0;

            for (var i = 0; i < name.Length; i++)
            {
                buf[2 * i + 1] = (byte)name[i];
                buf[2 * i + 2] = 0;
            }
            _ws.Send(buf);
        }

        public void MoveTo(double x, double y)
        {
            var buf = new byte[13];
            var writer = new BinaryWriter(new MemoryStream(buf));
            writer.Write((byte)16);
            writer.Write((int)x);
            writer.Write((int)y);
            //writer.Write(0);
            _ws.Send(buf);
        }

        public void Spectate() { _ws.Send(new byte[] { 1 }); }
        public void Split() { _ws.Send(new byte[] { 17 }); }
        public void Eject() { _ws.Send(new byte[] { 21 }); }

        private void OnOpen(object sender, EventArgs e)
        {
            Console.WriteLine("OnOpen");
            _ws.Send(new byte[] { 254, 5, 255, 35, 18, 56, 9, 80 });
            _ws.Send(Encoding.ASCII.GetBytes(_credentials.Key));
        }

        private void OnMessageReceived(object sender, EventArgs e)
        {
            var rawData = ((MessageEventArgs)e).RawData;
            _fileStream.Write(rawData, 0, rawData.Length);

            _dispatcher.BeginInvoke(new Action(() =>
            {
                var p = new Packet(rawData);
                var msg = p.ReadMessage();
                if (msg == null) Console.WriteLine("buffer of length 0");
                else _worldChangeMessageProcessor.ProcessMessage(msg);
            }));
        }

    }
}