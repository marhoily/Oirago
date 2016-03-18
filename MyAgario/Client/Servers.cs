using System;
using System.IO;
using System.Net;
using System.Text;

namespace MyAgario
{
    public static class Servers
    {
        private const string InitKey = "154669603";

        private static ServerCredentials MakePostRequest(string postData)
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
            using (var response = request.GetResponse())
            {
                Console.WriteLine(((HttpWebResponse) response).StatusDescription);
                using (var dataStream = response.GetResponseStream())
                    if (dataStream != null)
                        using (var reader = new StreamReader(dataStream))
                        {
                            var result = reader.ReadToEnd();
                            Console.WriteLine(result);
                            var lines = result.Split('\n');
                            return new ServerCredentials
                            {
                                Server = lines[0],
                                Key = lines[1]
                            };
                        }
            }
            return null;
        }

        public static ServerCredentials GetFfaServer(string region = "EU-London")
        {
            return MakePostRequest(region + "\n" + InitKey);
        }

        public static ServerCredentials GetExperimentalServer(string region = "EU-London")
        {
            return MakePostRequest(region + ":experimental\n" + InitKey);
        }

        public static ServerCredentials GetTeamsServer(string region = "EU-London")
        {
            return MakePostRequest(region + ":teams\n" + InitKey);
        }
    }
}