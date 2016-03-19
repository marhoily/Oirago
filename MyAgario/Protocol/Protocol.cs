using System.Collections.Generic;
using System.Linq;

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
                case 18: return new Message.DestroyAllBalls();
                case 20: return new Message.Nop();
                case 32: return p.ReadNewId();
                case 49: return new Message.LeadersBoard(p.ReadLeaders().ToArray());
                case 50: return new Message.TeamUpdate();
                case 64: return p.ReadWorldSize();
                case 72: return new Message.Nop();
                case 81: return new Message.ExperienceUpdate();
                case 240: return new Message.Nop();
                case 254: return new Message.GameOver();
                default: return new Message.Unknown(packetId);
            }
        }

        private static Message.Tick ReadTick(this Packet p)
        {
            return new Message.Tick(
                p.ReadEatings().ToArray(),
                p.ReadUpdates().ToArray(),
                p.ReadDisappearances().ToArray());
        }

        private static IEnumerable<Message.Eating> ReadEatings(this Packet p)
        {
            var eatersCount = p.ReadUShort();
            for (var i = 0; i < eatersCount; i++)
            {
                var eaterId = p.ReadUInt();
                var eatenId = p.ReadUInt();
                yield return new Message.Eating(eaterId, eatenId);
            }
        }
        private static IEnumerable<Message.Updates> ReadUpdates(this Packet p)
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
                yield return new Message.Updates(ballId,
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

        private static Message.Spectate ReadSpectate(this Packet p)
        {
            var x = p.ReadFloat();
            var y = p.ReadFloat();
            var zoom = p.ReadFloat();
            return new Message.Spectate(x, y, zoom);
        }
        private static Message.NewId ReadNewId(this Packet p)
        {
            var myBallId = p.ReadUInt();
            return new Message.NewId(myBallId);
        }
        private static Message.WorldSize ReadWorldSize(this Packet p)
        {
            var minX = p.ReadDouble();
            var minY = p.ReadDouble();
            var maxX = p.ReadDouble();
            var maxY = p.ReadDouble();
            return new Message.WorldSize(minX, minY, maxX, maxY);
        }

        private static IEnumerable<Message.Leader> ReadLeaders(this Packet p)
        {
            var count = p.ReadUInt();
            for (var i = 0; i < count; i++)
            {
                var id = p.ReadUInt();
                var name = p.ReadUnicodeString();
                yield return new Message.Leader(id, name);
            }
        }
    }
}