using System.Windows.Media;

namespace Oiraga
{
    public sealed class GameMessageProcessor
    {
        private readonly IGameEventsSink _gameEventsSink;
        private readonly World _world;

        public GameMessageProcessor(IGameEventsSink gameEventsSink)
        {
            _gameEventsSink = gameEventsSink;
            _world = new World();
        }

        public void ProcessMessage(Message msg)
        {
            var tick = msg as Message.Tick;
            if (tick != null) Process(tick);

            var newId = msg as Message.NewId;
            if (newId != null) Process(newId);

            //var spectate = msg as Spectate;
            //if (spectate != null) Spectate(spectate);

            var worldSize = msg as Message.ViewPort;
            if (worldSize != null) ProcessSize(worldSize);

            var destroyAllBalls = msg as Message.DestroyAllBalls;
            if (destroyAllBalls != null) DestroyAll();

            var leadersBoard = msg as Message.LeadersBoard;
            if (leadersBoard != null)
                _gameEventsSink.Leaders(leadersBoard);

            var unknown = msg as Message.Unknown;
            if (unknown != null) _gameEventsSink.Error(
                $"Unknown packet id {unknown.PacketId}");
        }

        private void ProcessSize(Message.ViewPort viewPort)
        {
            _gameEventsSink.WorldSize(viewPort.ToRectangle());
        }

        //private void Spectate(Spectate spectate)
        //{
        //    var zoom = spectate.Zoom;
        //    var dx = _world.SpectateViewPort.X - spectate.X;
        //    var dy = _world.SpectateViewPort.Y - spectate.Y;
        //    _world.SpectateViewPort = spectate;
        //    foreach (var ball in _world.Balls.Values)
        //        if (ball.IsFood || ball.State.IsVirus)
        //        {
        //            ball.Move((int)(dx * zoom), (int)(dy * zoom));
        //            _gameEventsSink.Update(ball);
        //        }
        //}
        private void Process(Message.Tick tick)
        {
            ProcessEating(tick);
            ProcessUpdating(tick);
            ProcessDisappearances(tick);
            _gameEventsSink.AfterTick(_world);
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
                    _gameEventsSink.Appears(eater);
                }
                Ball eaten;
                if (_world.Balls.TryGetValue(e.Eaten, out eaten))
                {
                    _gameEventsSink.Eats(eater, eaten);
                    _world.Balls.Remove(e.Eaten);
                    _world.MyBalls.Remove(eaten);
                    _gameEventsSink.Remove(eaten);
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
                    _gameEventsSink.Appears(newGuy);
                }
                else
                {
                    if (newGuy.State.Name != null)
                        state.Name = newGuy.State.Name;
                }
                newGuy.State = state;
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
                _gameEventsSink.Remove(dying);
            }
        }
        private void Process(Message.NewId msg)
        {
            var me = new Ball(true);
            _world.Balls.Add(msg.Id, me);
            _world.MyBalls.Add(me);
            me.State = new Message.Update(
                msg.Id, 0, 0, 32, Colors.DarkOrange, false, "me");
            _gameEventsSink.Appears(me);
        }

        private void DestroyAll()
        {
            foreach (var ball in _world.Balls)
                _gameEventsSink.Remove(ball.Value);
            _world.Balls.Clear();
            _world.MyBalls.Clear();
        }

    }

}