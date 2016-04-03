using WebSocketSharp;

namespace Oiraga
{
    public sealed class GameClient : IGameClient
    {
        private readonly ServerConnection _connection;
        private readonly WebSocket _ws;
        public IGameInput Input { get; }
        public IGameRawOutut RawOutut { get; }

        public GameClient(ILog log,
            GameRecorder recorder, ServerConnection connection)
        {
            _connection = connection;
            _ws = connection.ToWebSocket(log);
            Input = new GameInput(_ws);
            RawOutut = new GameRawOutput(log, recorder, _ws);
            _ws.Connect();
        }

        public void Dispose()
        {
            _connection.Dispose();
            _ws.Close();
        }
    }
}