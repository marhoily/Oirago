using System;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MyAgario
{
    public class EntryServersRegistry
    {
        private readonly IWindowAdapter _windowAdapter;
        private const string InitKey = "154669603";

        public EntryServersRegistry(IWindowAdapter windowAdapter)
        {
            _windowAdapter = windowAdapter;
        }

        public Task<ServerConnection> GetFfaServer(string region = "EU-London")
        {
            return Do(region + "\n" + InitKey);
        }
        public Task<ServerConnection> GetExperimentalServer(string region = "EU-London")
        {
            return Do(region + ":experimental\n" + InitKey);
        }
        public Task<ServerConnection> GetTeamsServer(string region = "EU-London")
        {
            return Do(region + ":teams\n" + InitKey);
        }
        
        private async Task<ServerConnection> Do(string postData)
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
        private async Task<ServerConnection> DoInner(string postData)
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
                            return new ServerConnection
                            {
                                Server = reader.ReadLine(),
                                Key = reader.ReadLine()
                            };
            }
            return null;
        }
    }
}