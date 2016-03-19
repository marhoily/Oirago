using System;
using System.IO;
using System.Linq;
using FluentAssertions;
using MyAgario;
using Xunit;

namespace Tests
{
    public class UnitTest1
    {
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
                var milestones = parts[1].Split(new[] {", "}, StringSplitOptions.RemoveEmptyEntries)
                    .Select(int.Parse).ToArray();
                Test(input, milestones);
                break;
            }
        }

        private void Test(byte[] input, int[] milestones)
        {/*
            var report = new Uint8Array(a.buffer).toString() + "|";
            report += b + ", ";
            //$.post( "http://localhost:12627/api/values", report);
    */

            var packet = new Packet(input);
            packet.ReadByte();
            //var tick = packet.ReadTick();
            //tick.Milestone1.Should().Be(milestones[0]);
            //tick.Milestone2.Should().Be(milestones[1]);
            //tick.Milestone3.Should().Be(milestones[2]);
        }
    }
}
