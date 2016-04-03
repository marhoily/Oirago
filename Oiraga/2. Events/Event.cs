using System.Diagnostics;
using System.Windows;
using System.Windows.Media;

namespace Oiraga
{
    public abstract class Event
    {
        public sealed class LeadersBoard : Event
        {
            public readonly Leader[] Leaders;

            public LeadersBoard(Leader[] leaders)
            {
                Leaders = leaders;
            }
        }
        public sealed class Leader
        {
            public readonly uint Id;
            public readonly string Name;

            public Leader(uint id, string name)
            {
                Id = id;
                Name = name;
            }
        }
        public struct Eating
        {
            public readonly uint Eater;
            public readonly uint Eaten;

            public Eating(uint eater, uint eaten)
            {
                Eater = eater;
                Eaten = eaten;
            }
        }
        public sealed class NewId : Event
        {
            public readonly uint Id;

            public NewId(uint id)
            {
                Id = id;
            }
        }
        [DebuggerDisplay("{MinX}..{MaxX}, {MinY}..{MaxY}")]
        public sealed class ViewPort : Event
        {
            public readonly double MaxX;
            public readonly double MaxY;
            public readonly double MinX;
            public readonly double MinY;

            public ViewPort(double maxX, double maxY, double minX, double minY)
            {
                MaxX = maxX;
                MaxY = maxY;
                MinX = minX;
                MinY = minY;
            }
        }

        public sealed class TeamUpdate : Event { }
        public sealed class Nop : Event { }
        public sealed class GameOver : Event { }
        public sealed class DestroyAllBalls : Event { }
        public sealed class ExperienceUpdate : Event { }
        public sealed class Forward : Event { }
        public sealed class LogOut : Event { }
        [DebuggerDisplay("{X}, {Y}: {Zoom}")]
        public sealed class Spectate : Event
        {
            public readonly double X;
            public readonly double Y;
            public readonly double Zoom;

            public Spectate(double x, double y, double zoom)
            {
                X = x;
                Y = y;
                Zoom = zoom;
            }
        }
        public sealed class Tick : Event
        {
            public readonly Eating[] Eatings;
            public readonly Update[] Updates;
            public readonly uint[] Disappearances;

            public Tick(Eating[] eatings, Update[] updates, uint[] disappearances)
            {
                Eatings = eatings;
                Updates = updates;
                Disappearances = disappearances;
            }
        }
        public sealed class Unknown : Event
        {
            public readonly byte PacketId;

            public Unknown(byte packetId)
            {
                PacketId = packetId;
            }
        }

        public sealed class Update
        {
            public readonly uint Id;
            public readonly Point Pos;
            public readonly short Size;
            public readonly Color Color;
            public readonly bool IsVirus;
            public readonly string Name;

            public Update(uint id, Point pos, short size, 
                Color color, bool isVirus, string name)
            {
                Id = id;
                Pos = pos;
                Size = size;
                
                IsVirus = isVirus;
                Name = name;
                Color = color;
            }
        }
    }
}