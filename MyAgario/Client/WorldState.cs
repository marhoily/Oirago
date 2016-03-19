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
        public double X;
        public double Y;
        public double Zoom;

        public WorldState()
        {
            Balls = new Dictionary<uint, Ball>();
            MyBalls = new List<Ball>();
        }

        private void ProcessWorldSize(Packet p)
        {
            MinX = p.ReadDouble();
            MinY = p.ReadDouble();
            MaxX = p.ReadDouble();
            MaxY = p.ReadDouble();
            //Console.WriteLine("world size : {0} {1} {2} {3}", MinX, MinY, MaxX, MaxY);
        }

        private void Process(Canvas canvas, Tick tick)
        {
            foreach (var e in tick.Eatings)
            {
                if (!Balls.ContainsKey(e.Eater))
                    Balls.Add(e.Eater, new Ball(canvas));
                if (!Balls.ContainsKey(e.Eaten))
                    Remove(Balls, e.Eaten);
            }
            foreach (var appears in tick.Appearances)
            {
                if (!Balls.ContainsKey(appears.Id))
                    Balls.Add(appears.Id, new Ball(canvas));

                var ball = Balls[appears.Id];
                ball.SetColor(appears.R, appears.G, appears.B, appears.IsVirus);
                ball.SetCoordinates(appears.X, appears.Y, appears.Size, this);
                ball.SetName(appears.Name);
            }

            foreach (var ballId in tick.Disappearances)
            {
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
            //Console.Clear();
            //Console.WriteLine("x: {0}..{1} | {2:F1}..{3:F1}", 
            //    Balls.Min(b => b.Value.X),
            //    Balls.Max(b => b.Value.X), MinX, MaxX);
            //Console.WriteLine("y: {0}..{1} | {2:F1}..{3:F1}",
            //    Balls.Min(b => b.Value.Y),
            //    Balls.Max(b => b.Value.Y), MinY, MaxY);
        }



        private void Remove(Dictionary<uint, Ball> balls, uint eatenId)
        {
            Ball ball;
            if (balls.TryGetValue(eatenId, out ball))
                ball.Destroy();
            balls.Remove(eatenId);

        }

        private void ProcessSpectate(Packet p)
        {
            X = p.ReadFloat();
            Y = p.ReadFloat();
            Zoom = p.ReadFloat();
        }

        private void ProcessNewId(Packet p, Canvas canvas)
        {
            var myBallId = p.ReadUInt();
            var b = new Ball(canvas) { Mine = true };
            Balls.Add(myBallId, b);
            MyBalls.Add(b);
        }

        public void ProcessMessage(Packet p, Canvas canvas)
        {
            if (p.Length == 0)
            {
                Console.WriteLine("buffer of length 0");
                return;
            }
            var packetId = p.ReadByte();
            switch (packetId)
            {
                case 16:
                    Process(canvas, p.ReadTick());
                    break;
                case 17:
                    ProcessSpectate(p);
                    break;
                case 18:
                    DestroyAllBalls();
                    break;
                case 20:
                    break;
                case 32:
                    ProcessNewId(p, canvas);
                    break;
                case 49:
                    Leaders(p);
                    break;

                case 50:
                    //teams scored update in teams mode
                    //TODO:implement see https://github.com/pulviscriptor/agario-client
                    break;
                case 64:
                    ProcessWorldSize(p);
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
                    Console.WriteLine("Unknown packet id {0}", packetId);
                    break;
            }
        }

        private void DestroyAllBalls()
        {
            foreach (var ball in Balls)
                ball.Value.Destroy();
            Balls.Clear();
        }

        private void Leaders(Packet p)
        {
            var count = p.ReadUInt();

            for (var i = 0; i < count; i++)
            {
                var id = p.ReadUInt();

                var name = "";
                while (true)
                {
                    var c = p.ReadUShort();
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