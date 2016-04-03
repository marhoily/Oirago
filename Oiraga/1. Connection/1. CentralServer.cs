using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Oiraga
{
    public class CentralServer
    {
        private readonly ILog _windowAdapter;
        private const string InitKey = "154669603";

        public CentralServer(ILog windowAdapter)
        {
            _windowAdapter = windowAdapter;
        }

        public Task<PlayServerKey> GetFfaServer(string region = "EU-London")
        {
            return Do(region + "\n" + InitKey);
        }
        public Task<PlayServerKey> GetExperimentalServer(string region = "EU-London")
        {
            return Do(region + ":experimental\n" + InitKey);
        }
        public Task<PlayServerKey> GetTeamsServer(string region = "EU-London")
        {
            return Do(region + ":teams\n" + InitKey);
        }

        private async Task<PlayServerKey> Do(string postData)
        {
            var result = await DoInner(postData);
            while (result == null)
                result = await DoInner(postData);
            return result;
        }
        /*
            if (!File.Exists("cache.json")) return await DoButCache(postData);
            var deserializeObject = JsonConvert.DeserializeObject(File.ReadAllText("cache.json"));
        */
        private async Task<PlayServerKey> DoInner(string postData)
        {
            var request = (HttpWebRequest)
                WebRequest.Create("http://m.agar.io/");
            request.Method = "POST";
            request.Headers.Add("Origin", "http://agar.io");
            request.Referer = "http://agar.io";
            var byteArray = Encoding.UTF8.GetBytes(postData);
            request.ContentType = "application/x-www-form-urlencoded";
            request.ContentLength = byteArray.Length;
            using (var dataStream = request.GetRequestStream())
                dataStream.Write(byteArray, 0, byteArray.Length);
            using (var response = await request.GetResponseAsync())
            {
                var webResponse = (HttpWebResponse)response;
                _windowAdapter.Error(webResponse.StatusDescription);
                if (webResponse.StatusCode != HttpStatusCode.OK)
                    return null;
                using (var dataStream = response.GetResponseStream())
                    if (dataStream != null)
                        using (var reader = new StreamReader(dataStream))
                            return new PlayServerKey(
                                server: reader.ReadLine(),
                                key: reader.ReadLine());
            }
            return null;
        }
    }
}