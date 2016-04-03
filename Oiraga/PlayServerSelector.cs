using System.Threading.Tasks;

namespace Oiraga
{
    public sealed class PlayServerSelector
    {
        private readonly ILog _log;

        public PlayServerSelector(ILog log) { _log = log; }

        public Task<IPlayServerConnection> GetGameClient()
        {
            return Real();
            //return Playback();
        }
        private static Task<IPlayServerConnection> Playback() => 
            Task.FromResult<IPlayServerConnection>(
                new PlaybackPlayServerConnection());

        private async Task<IPlayServerConnection> Real()
        {
            var entryServer = new CentralServer(_log);
            var credentials = await entryServer.GetFfaServer();
            var gameClient = new PlayServerConnection(
                _log, new EventsRecorder(), credentials);
            gameClient.Input.Spawn("blah");
            return gameClient;
        }
    }
}