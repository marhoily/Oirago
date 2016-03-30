using System.Collections.Generic;
using System.Linq;
using static MyAgario.Message;

namespace MyAgario
{
    public static class Protocol
    {
        public static Message ReadMessage(this Packet p)
        {
            if (p.Length == 0) return null;
            var packetId = p.ReadByte();
            switch (packetId)
            {
                case 16: return p.ReadTick();
                case 17: return p.ReadSpectate();
                case 18: return new DestroyAllBalls();
                case 20: return new Nop(); // clear less stuff
                case 21: return new Unknown(packetId); // set some variables?
                case 32: return p.ReadNewId();
                case 49: return new LeadersBoard(p.ReadLeaders().ToArray());
                case 50: return new TeamUpdate();
                case 64: return p.ReadWorldSize();
                case 72: return new Nop();
                case 81: return new ExperienceUpdate();
                case 102: return new ForwardMessage();
                case 104: return new LogOut();
                case 240: return new Nop();
                case 254: return new GameOver();
                default: return new Unknown(packetId);
            }
        }

        private static Tick ReadTick(this Packet p)
        {
            return new Tick(
                p.ReadEatings().ToArray(),
                p.ReadUpdates().ToArray(),
                p.ReadDisappearances().ToArray());
        }

        private static IEnumerable<Eating> ReadEatings(this Packet p)
        {
            var eatersCount = p.ReadUShort();
            for (var i = 0; i < eatersCount; i++)
            {
                var eaterId = p.ReadUInt();
                var eatenId = p.ReadUInt();
                yield return new Eating(eaterId, eatenId);
            }
        }
        private static IEnumerable<Updates> ReadUpdates(this Packet p)
        {
            while (true)
            {
                var ballId = p.ReadUInt();
                if (ballId == 0) break;
                var coordinateX = p.ReadInt();
                var coordinateY = p.ReadInt();
                var size = p.ReadShort();
                var colorR = p.ReadByte();
                var colorG = p.ReadByte();
                var colorB = p.ReadByte();
                var opt = p.ReadByte();
                var isVirus = (opt & 1) != 0;
                if ((opt & 2) != 0) p.Forward(p.ReadUInt());
                if ((opt & 4) != 0) p.ReadAsciiString();
                var name = p.ReadUnicodeString();
                yield return new Updates(ballId,
                    coordinateX, coordinateY, size,
                    colorR, colorG, colorB, isVirus, name);
            }
        }
        private static IEnumerable<uint> ReadDisappearances(this Packet p)
        {
            var count = p.ReadUInt();
            for (var i = 0; i < count; i++)
                yield return p.ReadUInt();
        }

        private static Spectate ReadSpectate(this Packet p)
        {
            var x = p.ReadFloat();
            var y = p.ReadFloat();
            var zoom = p.ReadFloat();
            return new Spectate(x, y, zoom);
        }
        private static NewId ReadNewId(this Packet p)
        {
            var myBallId = p.ReadUInt();
            return new NewId(myBallId);
        }
        private static ViewPort ReadWorldSize(this Packet p)
        {
            var minX = p.ReadDouble();
            var minY = p.ReadDouble();
            var maxX = p.ReadDouble();
            var maxY = p.ReadDouble();
            return new ViewPort(minX, minY, maxX, maxY);
        }

        private static IEnumerable<Leader> ReadLeaders(this Packet p)
        {
            var count = p.ReadUInt();
            for (var i = 0; i < count; i++)
            {
                var id = p.ReadUInt();
                var name = p.ReadUnicodeString();
                yield return new Leader(id, name);
            }
        }
    }
}