using System.IO;
using System.Linq;
using ApprovalTests;
using ApprovalTests.Reporters;
using MyAgario;
using Newtonsoft.Json;
using Xunit;

namespace Tests
{
    [UseReporter(typeof(AraxisMergeReporter))]
    public class UnitTest1
    {
        private readonly MessageProcessor _messageProcessor;
        private readonly World _world;

        public UnitTest1()
        {
            _world = new World();
            _messageProcessor = new MessageProcessor(
                new NullAdapter(), _world);
        }

        [Fact]
        public void TestMethod1()
        {
            var lines = File.ReadAllLines(@"c:\users\ilya\agario.log")
                .Distinct()
                .ToArray();
            foreach (var line in lines)
            {
                if (line == "") continue;
                var parts = line.Split('|');
                var input = parts[0].Split(',').Select(byte.Parse).ToArray();
                var packet = new Packet(input);
                _messageProcessor
                    .ProcessMessage(packet.ReadMessage());
            }
            Approvals.Verify(JsonConvert.SerializeObject(_world, Formatting.Indented));
        }
    }
}
