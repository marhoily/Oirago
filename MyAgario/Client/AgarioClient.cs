using System;
using System.Text;
using System.Windows.Threading;
using WebSocketSharp;

namespace MyAgario
{
    public class AgarioClient
    {
        private readonly Action<WorldState> _draw;
        private readonly ServerCredentials _credentials;
        private readonly WorldState _state;

        private readonly WebSocket _ws;
        private readonly Dispatcher _dispatcher;

        public AgarioClient(Action<WorldState> draw)
        {
            _dispatcher = Dispatcher.CurrentDispatcher;
            _draw = draw;
            Console.WriteLine(BitConverter.IsLittleEndian);
            _state = new WorldState();
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
            var buf = new byte[21];
            buf[0] = 16;
            var b = BitConverter.GetBytes(x);
            Array.Copy(b, 0, buf, 1, 8);
            b = BitConverter.GetBytes(y);
            Array.Copy(b, 0, buf, 9, 8);
            b = BitConverter.GetBytes((uint)0);
            Array.Copy(b, 0, buf, 17, 4);
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
            _dispatcher.BeginInvoke(new Action(() =>
            {
                _state.ProcessMessage(((MessageEventArgs) e).RawData);
                _draw(_state);
            }));
        }
    }
}