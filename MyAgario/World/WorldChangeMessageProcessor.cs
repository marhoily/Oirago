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
            var tick = msg as Message.Tick;
            if (tick != null) Process(tick);

            var newId = msg as Message.NewId;
            if (newId != null) Process(newId);

            var spectate = msg as Message.Spectate;
            if (spectate != null) Spectate(spectate);

            var worldSize = msg as Message.WorldSize;
            if (worldSize != null) _world.WorldSize = worldSize;

            var destroyAllBalls = msg as Message.DestroyAllBalls;
            if (destroyAllBalls != null) DestroyAll();

            var unknown = msg as Message.Unknown;
            if (unknown != null) Console.WriteLine(
                "Unknown packet id {0}", unknown.PacketId);
        }

        private void Spectate(Message.Spectate spectate)
        {
            var zoom = spectate.Zoom;
            var dx = _world.SpectateViewPort.X - spectate.X;
            var dy = _world.SpectateViewPort.Y - spectate.Y;
            _world.SpectateViewPort = spectate;
            foreach (var ball in _world.Balls.Values)
                if (ball.IsFood || ball.State.IsVirus)
                {
                    ball.Move((int)(dx * zoom), (int)(dy * zoom));
                    _windowAdapter.Update(ball, spectate);
                }
        }

        private void Process(Message.Tick tick)
        {
            ProcessEating(tick);
            ProcessUpdating(tick);
            ProcessDisappearances(tick);
        }
        private void ProcessEating(Message.Tick tick)
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
                    _world.MyBalls.Remove(eaten);
                    _windowAdapter.Remove(eaten);
                }
            }
        }
        private void ProcessUpdating(Message.Tick tick)
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
        private void ProcessDisappearances(Message.Tick tick)
        {
            foreach (var ballId in tick.Disappearances)
            {
                Ball dying;
                if (!_world.Balls.TryGetValue(ballId, out dying))
                    continue;
                if (dying.IsMine) _world.MyBalls.Remove(dying);
                _world.Balls.Remove(ballId);
                _world.MyBalls.Remove(dying);
                _windowAdapter.Remove(dying);
            }
        }
        private void Process(Message.NewId msg)
        {
            var me = new Ball(true);
            _world.Balls.Add(msg.Id, me);
            _world.MyBalls.Add(me);
            me.State = new Message.Updates(
                msg.Id, 0, 0, 32, 200, 0, 100, false, "me");
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