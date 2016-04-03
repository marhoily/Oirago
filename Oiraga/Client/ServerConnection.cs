namespace Oiraga
{
    public class ServerConnection
    {
        public readonly string Key;
        public readonly string Server;

        public ServerConnection(string key, string server)
        {
            Key = key;
            Server = server;
        }
    }
}