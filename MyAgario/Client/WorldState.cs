using System;
using System.Collections.Generic;

namespace MyAgario
{
    public sealed class WorldState
    {
        private readonly IWindowAdapter _windowAdapter;

        public readonly Dictionary<uint, Ball> Balls = new Dictionary<uint, Ball>();
        public readonly HashSet<Ball> MyBalls = new HashSet<Ball>();
        public Spectate SpectateViewPort = new Spectate(0, 0, 1);
        public WorldSize WorldSize;

        public WorldState(IWindowAdapter windowAdapter)
        {
            _windowAdapter = windowAdapter;
        }

        public void ProcessMessage(Message msg)
        {
            var tick = msg as Tick;
            if (tick != null) Process(tick);

            var newId = msg as NewId;
            if (newId != null) Process(newId);

            var spectate = msg as Spectate;
            if (spectate != null) SpectateViewPort = spectate;

            var worldSize = msg as WorldSize;
            if (worldSize != null) WorldSize = worldSize;

            var destroyAllBalls = msg as DestroyAllBalls;
            if (destroyAllBalls != null) DestroyAll();

            var unknown = msg as Unknown;
            if (unknown != null) Console.WriteLine(
                "Unknown packet id {0}", unknown.PacketId);
        }

        private void Process(Tick tick)
        {
            ProcessEating(tick);
            ProcessUpdating(tick);
            ProcessDisappearances(tick);
        }

        private void ProcessEating(Tick tick)
        {
            foreach (var e in tick.Eatings)
            {
                Ball eater;
                if (!Balls.TryGetValue(e.Eater, out eater))
                {
                    eater = new Ball(false);
                    Balls.Add(e.Eater, eater);
                    _windowAdapter.Appears(eater);
                }
                Ball eaten;
                if (Balls.TryGetValue(e.Eaten, out eaten))
                {
                    _windowAdapter.Eats(eater, eaten);
                    Balls.Remove(e.Eaten);
                    _windowAdapter.Remove(eaten);
                }
            }
        }

        private void ProcessUpdating(Tick tick)
        {
            foreach (var state in tick.Updates)
            {
                Ball newGuy;
                if (!Balls.TryGetValue(state.Id, out newGuy))
                {
                    newGuy = new Ball(false);
                    Balls.Add(state.Id, newGuy);
                    _windowAdapter.Appears(newGuy);
                }
                newGuy.State = state;
                _windowAdapter.Update(newGuy, SpectateViewPort);
            }
        }

        private void ProcessDisappearances(Tick tick)
        {
            foreach (var ballId in tick.Disappearances)
            {
                Ball dying;
                if (!Balls.TryGetValue(ballId, out dying))
                    continue;
                if (dying.IsMine) MyBalls.Remove(dying);
                Balls.Remove(ballId);
                _windowAdapter.Remove(dying);
            }
        }

        private void Process(NewId msg)
        {
            var me = new Ball(true);
            Balls.Add(msg.Id, me);
            MyBalls.Add(me);
            me.State = new Updates(
                msg.Id, 0, 0, 10, 200, 0, 100, false, "me");
            _windowAdapter.Appears(me);
        }

        private void DestroyAll()
        {
            foreach (var ball in Balls)
                _windowAdapter.Remove(ball.Value);
            Balls.Clear();
            MyBalls.Clear();
        }
    }
}