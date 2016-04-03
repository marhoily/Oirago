using System.Linq;
using System.Windows.Media;

namespace Oiraga
{
    public sealed class GameMessageProcessor
    {
        private readonly IGameEventsSink _gameEventsSink;
        private readonly ILog _log;
        private readonly Balls _balls;

        public GameMessageProcessor(IGameEventsSink gameEventsSink, ILog log)
        {
            _gameEventsSink = gameEventsSink;
            _log = log;
            _balls = new Balls();
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
                _gameEventsSink.Leaders(leadersBoard.Leaders.Select(x => x.Name));

            var unknown = msg as Message.Unknown;
            if (unknown != null) _log.Error(
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
            _gameEventsSink.AfterTick(_balls);
        }
        private void ProcessEating(Message.Tick tick)
        {
            foreach (var e in tick.Eatings)
            {
                Ball eater;
                if (!_balls.All.TryGetValue(e.Eater, out eater))
                {
                    eater = new Ball(false);
                    _balls.All.Add(e.Eater, eater);
                    _gameEventsSink.Appears(eater);
                }
                Ball eaten;
                if (_balls.All.TryGetValue(e.Eaten, out eaten))
                {
                    _gameEventsSink.Eats(eater, eaten);
                    _balls.All.Remove(e.Eaten);
                    _balls.My.Remove(eaten);
                    _gameEventsSink.Remove(eaten);
                }
            }
        }
        private void ProcessUpdating(Message.Tick tick)
        {
            foreach (var state in tick.Updates)
            {
                Ball newGuy;
                if (!_balls.All.TryGetValue(state.Id, out newGuy))
                {
                    newGuy = new Ball(false);
                    _balls.All.Add(state.Id, newGuy);
                    _gameEventsSink.Appears(newGuy);
                }
                
                newGuy.Update(state.X, state.Y, state.Size,
                    state.Color, state.IsVirus, state.Name);
            }
        }
        private void ProcessDisappearances(Message.Tick tick)
        {
            foreach (var ballId in tick.Disappearances)
            {
                Ball dying;
                if (!_balls.All.TryGetValue(ballId, out dying))
                    continue;
                if (dying.IsMine) _balls.My.Remove(dying);
                _balls.All.Remove(ballId);
                _balls.My.Remove(dying);
                _gameEventsSink.Remove(dying);
            }
        }
        private void Process(Message.NewId msg)
        {
            var me = new Ball(true);
            _balls.All.Add(msg.Id, me);
            _balls.My.Add(me);
            me.Update(0, 0, 32, Colors.DarkOrange, false, "me");
            _gameEventsSink.Appears(me);
        }

        private void DestroyAll()
        {
            foreach (var ball in _balls.All)
                _gameEventsSink.Remove(ball.Value);
            _balls.All.Clear();
            _balls.My.Clear();
        }

    }

}