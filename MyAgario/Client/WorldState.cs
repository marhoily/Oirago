using System;
using System.Collections.Generic;
using System.Windows.Controls;

namespace MyAgario
{
    public class WorldState
    {
        public readonly Dictionary<uint, Ball> Balls;
        public double MaxX;
        public double MaxY;
        public double MinX;
        public double MinY;
        public readonly List<Ball> MyBalls;
        public int TickCounter;
        public double X;
        public double Y;
        public double Zoom;

        public WorldState()
        {
            Balls = new Dictionary<uint, Ball>();
            MyBalls = new List<Ball>();
        }

        private void ProcessWorldSize(byte[] buffer)
        {
            var offset = 1;

            MinX = Packet.ReadDoubleLe(buffer, ref offset);
            MinY = Packet.ReadDoubleLe(buffer, ref offset);
            MaxX = Packet.ReadDoubleLe(buffer, ref offset);
            MaxY = Packet.ReadDoubleLe(buffer, ref offset);
            //Console.WriteLine("world size : {0} {1} {2} {3}", MinX, MinY, MaxX, MaxY);
        }

        private void ProcessTick(byte[] buffer, Canvas canvas)
        {
            var offset = 1;
            TickCounter++;
            offset = EatEvents(buffer, canvas, offset);
            offset = ReadActionsOfBalls(buffer, canvas, offset);
            RemoveBalls(buffer, canvas, offset);
            if (offset != buffer.Length)
                1.ToString();
            //Console.Clear();
            //Console.WriteLine("x: {0}..{1} | {2:F1}..{3:F1}", 
            //    Balls.Min(b => b.Value.X),
            //    Balls.Max(b => b.Value.X), MinX, MaxX);
            //Console.WriteLine("y: {0}..{1} | {2:F1}..{3:F1}",
            //    Balls.Min(b => b.Value.Y),
            //    Balls.Max(b => b.Value.Y), MinY, MaxY);
        }

        private void RemoveBalls(byte[] buffer, Canvas canvas, int offset)
        {
            var count = Packet.ReadUInt32Le(buffer, ref offset);
            for (var i = 0; i < count; i++)
            {
                var ballId = Packet.ReadUInt32Le(buffer, ref offset);
                var b = Balls.ContainsKey(ballId)
                    ? Balls[ballId]
                    : new Ball(canvas);
                if (b.Mine)
                {
                    MyBalls.Remove(b);
                    b.Destroy();
                }

                Balls.Remove(ballId);
            }
        }

        private int ReadActionsOfBalls(byte[] buffer, Canvas canvas, int offset)
        {
            while (true)
            {
                var ballId = Packet.ReadUInt32Le(buffer, ref offset);
                if (ballId == 0) break;
                var coordinateX = Packet.ReadSInt32Le(buffer, ref offset);
                var coordinateY = Packet.ReadSInt32Le(buffer, ref offset);
                var size = Packet.ReadSInt16Le(buffer, ref offset);

                var colorR = Packet.ReadUInt8(buffer, ref offset);
                var colorG = Packet.ReadUInt8(buffer, ref offset);
                var colorB = Packet.ReadUInt8(buffer, ref offset);

                var opt = Packet.ReadUInt8(buffer, ref offset);

                var isVirus = (opt & 1) != 0;

                //reserved for future use?
                if ((opt & 2) != 0)
                {
                    offset += (int)Packet.ReadUInt32Le(buffer, ref offset);
                }
                if ((opt & 4) != 0)
                {
                    while (true)
                    {
                        var ch = Packet.ReadUInt8(buffer, ref offset);
                        if (ch == 0) break;
                    }
                }
                var nick = "";
                while (true)
                {
                    var ch = Packet.ReadUInt16Le(buffer, ref offset);
                    if (ch == 0)
                        break;
                    nick += (char)ch;
                }

                if (!Balls.ContainsKey(ballId))
                    Balls.Add(ballId, new Ball(canvas));

                var ball = Balls[ballId];
                ball.SetColor(colorR, colorG, colorB, isVirus);
                ball.SetCoordinates(coordinateX, coordinateY, size, this);
                ball.SetNick(nick);
            }
            return offset;
        }

        private int EatEvents(byte[] buffer, Canvas canvas, int offset)
        {
            var eatersCount = Packet.ReadUInt16Le(buffer, ref offset);
            for (var i = 0; i < eatersCount; i++)
            {
                var eaterId = Packet.ReadUInt32Le(buffer, ref offset);
                var eatenId = Packet.ReadUInt32Le(buffer, ref offset);

                if (!Balls.ContainsKey(eaterId))
                    Balls.Add(eaterId, new Ball(canvas));
                if (!Balls.ContainsKey(eatenId))
                    Remove(Balls, eatenId);
            }
            return offset;
        }

        private void Remove(Dictionary<uint, Ball> balls, uint eatenId)
        {
            Ball ball;
            if (balls.TryGetValue(eatenId, out ball))
                ball.Destroy();
            balls.Remove(eatenId);

        }

        private void ProcessSpectate(byte[] buffer)
        {
            var offset = 1;
            X = Packet.ReadFloatLe(buffer, ref offset);
            Y = Packet.ReadFloatLe(buffer, ref offset);
            Zoom = Packet.ReadFloatLe(buffer, ref offset);
        }

        private void ProcessNewId(byte[] buffer, Canvas canvas)
        {
            var offset = 1;
            var myBallId = Packet.ReadUInt32Le(buffer, ref offset);
            var b = new Ball(canvas) { Mine = true };
            Balls.Add(myBallId, b);
            MyBalls.Add(b);
        }

        public void ProcessMessage(byte[] buffer, Canvas canvas)
        {
            if (buffer.Length == 0)
            {
                Console.WriteLine("buffer of length 0");
                return;
            }
            switch (buffer[0])
            {
                case 16:
                    ProcessTick(buffer, canvas);
                    break;
                case 17:
                    ProcessSpectate(buffer);
                    break;
                case 18:
                    DestroyAllBalls();
                    break;
                case 20:
                    break;
                case 32:
                    ProcessNewId(buffer, canvas);
                    break;
                case 49:
                    Leaders(buffer);
                    break;

                case 50:
                    //teams scored update in teams mode
                    //TODO:implement see https://github.com/pulviscriptor/agario-client
                    break;
                case 64:
                    ProcessWorldSize(buffer);
                    break;
                case 72:
                    //packet is sent by server but not used in original code
                    break;
                case 81:
                    //client.emit('experienceUpdate', level, curernt_exp, need_exp);
                    //I don't know what this should do
                    break;
                case 240:
                    break;
                case 254:
                    //somebody won, end of the game (server restart)
                    break;

                default:
                    Console.WriteLine("Unknown packet id {0}", buffer[0]);
                    break;
            }
        }

        private void DestroyAllBalls()
        {
            foreach (var ball in Balls)
                ball.Value.Destroy();
            Balls.Clear();
        }

        private void Leaders(byte[] buffer)
        {
            int offset = 1;
            var count = Packet.ReadUInt32Le(buffer, ref offset);

            for (var i = 0; i < count; i++)
            {
                var id = Packet.ReadUInt32Le(buffer, ref offset);

                var name = "";
                while (true)
                {
                    var c = Packet.ReadUInt16Le(buffer, ref offset);
                    if (c == 0) break;
                    name += (char)c;
                }
                //Console.Write(id + "->" + name + "; ");
            }
        }

        public void Purge()
        {
            DestroyAllBalls();
        }
    }
}