using System.Threading.Tasks;

namespace Oiraga
{
    public sealed class GameClientProvider
    {
        private readonly IGameEventsSink _middleman;

        public GameClientProvider(IGameEventsSink middleman)
        {
            _middleman = middleman;
        }

        public Task<IGameClient> GetGameClient()
        {
            //return Real();
            return Playback();
        }
        private static Task<IGameClient> Playback() => 
            Task.FromResult<IGameClient>(new GamePlayback());

        private async Task<IGameClient> Real()
        {
            var entryServer = new EntryServersRegistry(_middleman);
            var credentials = await entryServer.GetFfaServer();
            var gameClient = new GameClient(
                _middleman, new GameRecorder(), credentials);
            gameClient.Input.Spawn("blah");
            return gameClient;
        }
    }
}