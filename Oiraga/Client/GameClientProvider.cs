using System.Threading.Tasks;

namespace Oiraga
{
    public sealed class GameClientProvider
    {
        private readonly ILog _log;

        public GameClientProvider(ILog log)
        {
            _log = log;
        }

        public Task<IGameClient> GetGameClient()
        {
            return Real();
            //return Playback();
        }
        private static Task<IGameClient> Playback() => 
            Task.FromResult<IGameClient>(new GamePlayback());

        private async Task<IGameClient> Real()
        {
            var entryServer = new EntryServersRegistry(_log);
            var credentials = await entryServer.GetFfaServer();
            var gameClient = new GameClient(
                _log, new GameRecorder(), credentials);
            gameClient.Input.Spawn("blah");
            return gameClient;
        }
    }
}