using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Oiraga
{
    public class CentralServer
    {
        private readonly ILog _log;
        private const string InitKey = "154669603";

        public CentralServer(ILog log) { _log = log; }

        public Task<PlayServerKey> GetFfaServer(string region = "EU-London")
            => Do(region + "\n" + InitKey);
        public Task<PlayServerKey> GetExperimentalServer(string region = "EU-London")
            => Do(region + ":experimental\n" + InitKey);
        public Task<PlayServerKey> GetTeamsServer(string region = "EU-London")
            => Do(region + ":teams\n" + InitKey);

        private async Task<PlayServerKey> Do(string postData)
        {
            var result = await DoInner(postData);
            while (result == null)
                result = await DoInner(postData);
            return result;
        }
        private async Task<PlayServerKey> DoInner(string postData)
        {
            using (var client = new HttpClient())
            {
                var response = await client.PostAsync("http://m.agar.io/",
                    new StringContent(postData, Encoding.UTF8, "application/x-www-form-urlencoded")
                    {
                        Headers = {{"Origin", "http://agar.io"}}
                    });
                _log.Error(response.StatusCode.ToString());
                if (!response.IsSuccessStatusCode) return null;
                var text = await response.Content.ReadAsStringAsync();
                var split = text.Split('\n');
                return new PlayServerKey(server: split[0], key: split[1]);
            }
        }
    }
}