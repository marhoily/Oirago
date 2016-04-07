using System.IO;
using System.Linq;
using ApprovalTests;
using ApprovalTests.Reporters;
using Newtonsoft.Json;
using Oiraga;
using Xunit;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace Tests
{
    [UseReporter(typeof(AraxisMergeReporter))]
    public class UnitTest1
    {
        private readonly EventDispatcher _eventDispatcher;
        private readonly TestReceiver _gameEventsSink;

        public UnitTest1()
        {
            _gameEventsSink = new TestReceiver();
            _eventDispatcher = new EventDispatcher(
                _gameEventsSink, new NullLog());
        }

        //[Fact]
        public void TestMethod1()
        {
            var lines = File.ReadAllLines(@"c:\users\ilya\game.log")
                .Distinct()
                .ToArray();
            foreach (var line in lines)
            {
                if (line == "") continue;
                var parts = line.Split('|');
                var input = parts[0].Split(',').Select(byte.Parse).ToArray();
                var packet = new BinaryReader(new MemoryStream(input));
                _eventDispatcher
                    .Dispatch(packet.ReadMessage());
            }
            Approvals.Verify(JsonConvert.SerializeObject(
                _gameEventsSink.Balls, Formatting.Indented));
        }
        //[Fact]
        public async Task TestMethod2()
        {
            var s = new CentralServer(new NullLog());
            var list = new List<PlayServerKey>();
            for (var i = 0; i < 100; i++)
                list.Add(await s.GetFfaServer());
            File.WriteAllText(@"c:\srcroot\Oirago\servers.json",
                JsonConvert.SerializeObject(list));
        }
        [Fact]
        public void TestMethod3()
        {
            var list = JsonConvert.DeserializeObject<List<PlayServerKey>>(
                File.ReadAllText(@"c:\srcroot\Oirago\servers.json"));
            var g = list
                .GroupBy(x => x.Server)
                .Select(x => new
                {
                    Server = x.Key,
                    Keys = x.Select(y => y.Key)
                });
            Console.WriteLine(JsonConvert.
                SerializeObject(g, Formatting.Indented));
        }

    }

    public class NullLog : ILog
    {
        public void Error(string message) { }
    }
}
