using System.Threading.Tasks;

namespace Oiraga
{
    public  class GameClientProvider
    {
        private readonly WindowAdapterComposer _middleman;

        public GameClientProvider(WindowAdapterComposer middleman)
        {
            _middleman = middleman;
        }

        public Task<IOiragaClient> GetGameClient()
        {
            return Real();
            return Playback();
        }
        private Task<IOiragaClient> Playback()
        {
            return Task.FromResult<IOiragaClient>(new OiragaPlayback());
        }

        private async Task<IOiragaClient> Real()
        {
            var entryServer = new EntryServersRegistry(_middleman);
            var credentials = await entryServer.GetFfaServer();
            var gameClient = new OiragaClient(
                _middleman, new GameRecorder(), credentials);
            gameClient.Spawn("blah");
            return gameClient;
        }
    }
}