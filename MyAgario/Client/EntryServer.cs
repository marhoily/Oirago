using System;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace MyAgario
{
    public class EntryServer
    {
        private readonly IWindowAdapter _windowAdapter;
        private const string InitKey = "154669603";

        public EntryServer(IWindowAdapter windowAdapter)
        {
            _windowAdapter = windowAdapter;
        }

        public Task<WebSocketServerCredentials> GetFfaServer(string region = "EU-London")
        {
            return Do(region + "\n" + InitKey);
        }
        public Task<WebSocketServerCredentials> GetExperimentalServer(string region = "EU-London")
        {
            return Do(region + ":experimental\n" + InitKey);
        }
        public Task<WebSocketServerCredentials> GetTeamsServer(string region = "EU-London")
        {
            return Do(region + ":teams\n" + InitKey);
        }

        private async Task<WebSocketServerCredentials> Do(string postData)
        {
            // Maybe we could use webclient but I didn't 
            // succeed making a correctly formated
            // application /x-www-form-urlencoded post request
            var request = (HttpWebRequest)WebRequest.Create("http://m.agar.io/");
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
                _windowAdapter.Error(((HttpWebResponse)response).StatusDescription);
                using (var dataStream = response.GetResponseStream())
                    if (dataStream != null)
                        using (var reader = new StreamReader(dataStream))
                        {
                            var result = reader.ReadToEnd();
                            _windowAdapter.Error(result);
                            var lines = result.Split('\n');
                            return new WebSocketServerCredentials
                            {
                                Server = lines[0],
                                Key = lines[1]
                            };
                        }
            }
            return null;
        }
    }
}