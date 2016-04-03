using System.IO;
using System.Linq;
using ApprovalTests;
using ApprovalTests.Reporters;
using Newtonsoft.Json;
using Oiraga;
using Xunit;

namespace Tests
{
    [UseReporter(typeof(AraxisMergeReporter))]
    public class UnitTest1
    {
        private readonly GameMessageDispatcher _gameMessageDispatcher;
        private readonly NullAdapter _gameEventsSink;

        public UnitTest1()
        {
            _gameEventsSink = new NullAdapter();
            _gameMessageDispatcher = new GameMessageDispatcher(
                _gameEventsSink, new NullLog());
        }

        [Fact]
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
                _gameMessageDispatcher
                    .ProcessMessage(packet.ReadMessage());
            }
            Approvals.Verify(JsonConvert.SerializeObject(
                _gameEventsSink.Balls, Formatting.Indented));
        }
    }

    public class NullLog : ILog
    {
        public void Error(string message) {  }
    }
}
