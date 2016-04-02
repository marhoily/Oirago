using System.Diagnostics;
using System.Windows.Media;

namespace Oiraga
{
    public abstract class Message
    {
        public sealed class LeadersBoard : Message
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
        public sealed class NewId : Message
        {
            public readonly uint Id;

            public NewId(uint id)
            {
                Id = id;
            }
        }
        [DebuggerDisplay("{MinX}..{MaxX}, {MinY}..{MaxY}")]
        public sealed class ViewPort : Message
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

        public sealed class TeamUpdate : Message { }
        public sealed class Nop : Message { }
        public sealed class GameOver : Message { }
        public sealed class DestroyAllBalls : Message { }
        public sealed class ExperienceUpdate : Message { }
        public sealed class ForwardMessage : Message { }
        public sealed class LogOut : Message { }
        [DebuggerDisplay("{X}, {Y}: {Zoom}")]
        public sealed class Spectate : Message
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
        public sealed class Tick : Message
        {
            public readonly Eating[] Eatings;
            public readonly Updates[] Updates;
            public readonly uint[] Disappearances;

            public Tick(Eating[] eatings, Updates[] updates, uint[] disappearances)
            {
                Eatings = eatings;
                Updates = updates;
                Disappearances = disappearances;
            }
        }
        public sealed class Unknown : Message
        {
            public readonly byte PacketId;

            public Unknown(byte packetId)
            {
                PacketId = packetId;
            }
        }

        public sealed class Updates
        {
            public readonly uint Id;
            public readonly int X, Y;
            public readonly short Size;
            public readonly Color Color;
            public readonly bool IsVirus;
            public string Name;

            public Updates(uint id, int x, int y, short size, 
                Color color, bool isVirus, string name)
            {
                Id = id;
                X = x;
                Y = y;
                Size = size;
                
                IsVirus = isVirus;
                Name = name;
                Color = color;
            }
        }
    }
}