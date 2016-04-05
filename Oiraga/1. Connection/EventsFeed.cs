using Nito.AsyncEx;
using System;
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

        private void OnMessageReceived(object sender, EventArgs e)
        {
            var rawData = ((MessageEventArgs)e).RawData;
            _recorder.Save(rawData);
            var p = new BinaryReader(new MemoryStream(rawData));
            var msg = p.ReadMessage();
            if (msg == null) _log.Error("buffer of length 0");
            else _events.Add(msg);
        }

        public Task<Event> NextEvent() => _events.TakeAsync();
    }
}