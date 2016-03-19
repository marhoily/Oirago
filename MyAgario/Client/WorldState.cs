using System;
using System.Collections.Generic;
using System.Windows.Controls;

namespace MyAgario
{
    public class WorldState
    {
        public readonly Dictionary<uint, Ball> Balls;
        public readonly List<Ball> MyBalls;
        public double X;
        public double Y;
        public double Zoom;
        public WorldSize WorldSize;

        public WorldState()
        {
            Balls = new Dictionary<uint, Ball>();
            MyBalls = new List<Ball>();
        }

        public void ProcessMessage(Message msg, Canvas canvas)
        {
            var tick = msg as Tick;
            if (tick != null) Process(tick, canvas);

            var newId = msg as NewId;
            if (newId != null) Process(newId, canvas);

            var spectate = msg as Spectate;
            if (spectate != null) Process(spectate);

            var worldSize = msg as WorldSize;
            if (worldSize != null) Process(worldSize);

            var destroyAllBalls = msg as DestroyAllBalls;
            if (destroyAllBalls != null) Process();

            var unknown = msg as Unknown;
            if (unknown != null) Console.WriteLine(
                "Unknown packet id {0}", unknown.PacketId);
        }

        private void Process(WorldSize msg)
        {
            WorldSize = msg;
        }
        private void Process(Tick tick, Canvas canvas)
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
        private void Process()
        {
            foreach (var ball in Balls)
                ball.Value.Destroy();
            Balls.Clear();
        }
        private void Process(Spectate msg)
        {
            X = msg.X;
            Y = msg.Y;
            Zoom = msg.Zoom;
        }
        private void Process(NewId msg, Canvas canvas)
        {
            var b = new Ball(canvas) { Mine = true };
            Balls.Add(msg.Id, b);
            MyBalls.Add(b);
        }

        public void Purge()
        {
            Process();
        }
        private void Remove(Dictionary<uint, Ball> balls, uint eatenId)
        {
            Ball ball;
            if (balls.TryGetValue(eatenId, out ball))
                ball.Destroy();
            balls.Remove(eatenId);

        }
    }
}