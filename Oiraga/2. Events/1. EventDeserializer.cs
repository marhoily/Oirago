using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Windows;
using System.Windows.Media;

namespace Oiraga
{
    public static class EventDeserializer
    {
        public static Event ReadMessage(this BinaryReader p)
        {
            var packetId = p.ReadByte();
            switch (packetId)
            {
                case 016: return p.ReadTick();
                case 017: return p.ReadSpectate();
                case 018: return new DestroyAllBalls();
                case 020: return new Nop(); // clear less stuff
                case 021: return new Unknown(packetId); // set some variables?
                case 032: return p.ReadNewId();
                case 049: return new LeadersBoard(p.ReadLeaders().ToArray());
                case 050: return new TeamUpdate();
                case 064: return p.ReadWorldSize();
                case 072: return new Nop();
                case 081: return new ExperienceUpdate();
                case 102: return new Forward();
                case 104: return new LogOut();
                case 240: return new Nop();
                case 254: return new GameOver();
                default: return new Unknown(packetId);
            }
        }

        private static Tick ReadTick(this BinaryReader p)
        {
            return new Tick(
                p.ReadEatings().ToArray(),
                p.ReadUpdates().ToArray(),
                p.ReadDisappearances().ToArray());
        }

        private static IEnumerable<Eating> ReadEatings(this BinaryReader p)
        {
            var eatersCount = p.ReadUInt16();
            for (var i = 0; i < eatersCount; i++)
            {
                var eaterId = p.ReadUInt32();
                var eatenId = p.ReadUInt32();
                yield return new Eating(eaterId, eatenId);
            }
        }
        private static IEnumerable<Update> ReadUpdates(this BinaryReader p)
        {
            while (true)
            {
                var ballId = p.ReadUInt32();
                if (ballId == 0) break;
                var pos = new Point(p.ReadInt32(), p.ReadInt32());
                var size = p.ReadInt16();
                var color = Color.FromRgb(
                    p.ReadByte(), p.ReadByte(), p.ReadByte());
                var opt = p.ReadByte();
                var isVirus = (opt & 1) != 0;
                if ((opt & 2) != 0) p.BaseStream.Seek(p.ReadUInt32(), SeekOrigin.Current);
                if ((opt & 4) != 0) p.ReadAsciiString();
                var name = p.ReadUnicodeString();
                yield return new Update(ballId, pos, size, color, isVirus, name);
            }
        }
        private static IEnumerable<uint> ReadDisappearances(this BinaryReader p)
        {
            var count = p.ReadUInt32();
            for (var i = 0; i < count; i++)
                yield return p.ReadUInt32();
        }

        private static Spectate ReadSpectate(this BinaryReader p)
        {
            var x = p.ReadSingle();
            var y = p.ReadSingle();
            var zoom = p.ReadSingle();
            return new Spectate(new Point(x, y), zoom);
        }
        private static NewId ReadNewId(this BinaryReader p)
        {
            var myBallId = p.ReadUInt32();
            return new NewId(myBallId);
        }
        private static ViewPort ReadWorldSize(this BinaryReader p)
        {
            var minX = p.ReadDouble();
            var minY = p.ReadDouble();
            var maxX = p.ReadDouble();
            var maxY = p.ReadDouble();
            return new ViewPort(minX, minY, maxX, maxY);
        }

        private static IEnumerable<Leader> ReadLeaders(this BinaryReader p)
        {
            var count = p.ReadUInt32();
            for (var i = 0; i < count; i++)
            {
                var id = p.ReadUInt32();
                var name = p.ReadUnicodeString();
                yield return new Leader(id, name);
            }
        }
    }
}