using System;

namespace MyAgario
{
    public sealed class WorldChangeMessageProcessor
    {
        private readonly IWindowAdapter _windowAdapter;
        private readonly World _world;

        public WorldChangeMessageProcessor(IWindowAdapter windowAdapter, World world)
        {
            _windowAdapter = windowAdapter;
            _world = world;
        }

        public void ProcessMessage(Message msg)
        {
            var tick = msg as Tick;
            if (tick != null) Process(tick);

            var newId = msg as NewId;
            if (newId != null) Process(newId);

            var spectate = msg as Spectate;
            if (spectate != null) _world.SpectateViewPort = spectate;

            var worldSize = msg as WorldSize;
            if (worldSize != null) _world.WorldSize = worldSize;

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
                if (!_world.Balls.TryGetValue(e.Eater, out eater))
                {
                    eater = new Ball(false);
                    _world.Balls.Add(e.Eater, eater);
                    _windowAdapter.Appears(eater);
                }
                Ball eaten;
                if (_world.Balls.TryGetValue(e.Eaten, out eaten))
                {
                    _windowAdapter.Eats(eater, eaten);
                    _world.Balls.Remove(e.Eaten);
                    _windowAdapter.Remove(eaten);
                }
            }
        }
        private void ProcessUpdating(Tick tick)
        {
            foreach (var state in tick.Updates)
            {
                Ball newGuy;
                if (!_world.Balls.TryGetValue(state.Id, out newGuy))
                {
                    newGuy = new Ball(false);
                    _world.Balls.Add(state.Id, newGuy);
                    _windowAdapter.Appears(newGuy);
                }
                newGuy.State = state;
                _windowAdapter.Update(newGuy, _world.SpectateViewPort);
            }
        }
        private void ProcessDisappearances(Tick tick)
        {
            foreach (var ballId in tick.Disappearances)
            {
                Ball dying;
                if (!_world.Balls.TryGetValue(ballId, out dying))
                    continue;
                if (dying.IsMine) _world.MyBalls.Remove(dying);
                _world.Balls.Remove(ballId);
                _windowAdapter.Remove(dying);
            }
        }
        private void Process(NewId msg)
        {
            var me = new Ball(true);
            _world.Balls.Add(msg.Id, me);
            _world.MyBalls.Add(me);
            me.State = new Updates(
                msg.Id, 0, 0, 10, 200, 0, 100, false, "me");
            _windowAdapter.Appears(me);
        }
        private void DestroyAll()
        {
            foreach (var ball in _world.Balls)
                _windowAdapter.Remove(ball.Value);
            _world.Balls.Clear();
            _world.MyBalls.Clear();
        }
    }
}