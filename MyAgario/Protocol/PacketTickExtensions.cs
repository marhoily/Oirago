using System.Collections.Generic;
using System.Linq;

namespace MyAgario
{
    public static class PacketTickExtensions
    {
        public static Tick ReadTick(this Packet p)
        {
            return new Tick(
                p.ReadEatings().ToArray(),
                p.ReadAppearances().ToArray(),
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
        private static IEnumerable<Appearance> ReadAppearances(this Packet p)
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
                yield return new Appearance(ballId,
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
    }
}