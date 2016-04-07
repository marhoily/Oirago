using Nito.AsyncEx;
using System.IO;
using System.Threading.Tasks;
using WebSocketSharp;

namespace Oiraga
{
    public sealed class EventsFeed : IEventsFeed
    {
        private readonly ILog _log;
        private readonly EventsRecorder _recorder;
        private readonly AsyncCollection<Event>
            _events = new AsyncCollection<Event>();

        public EventsFeed(WebSocket ws, EventsRecorder recorder, ILog log)
        {
            _log = log;
            _recorder = recorder;
            ws.OnMessage += OnMessageReceived;
        }

        private void OnMessageReceived(object sender, MessageEventArgs e)
        {
            _recorder.Save(e.RawData);
            var p = new BinaryReader(new MemoryStream(e.RawData));
            var msg = p.ReadMessage();
            _events.Add(msg);
        }

        public Task<Event> NextEvent() => _events.TakeAsync();
    }
}