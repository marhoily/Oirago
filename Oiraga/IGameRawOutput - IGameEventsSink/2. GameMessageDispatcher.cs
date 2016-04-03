using System.Linq;
using System.Windows.Media;

namespace Oiraga
{
    public sealed class GameMessageDispatcher
    {
        private readonly IGameEventsSink _gameEventsSink;
        private readonly ILog _log;
        private readonly GameState _gameState;

        public GameMessageDispatcher(IGameEventsSink gameEventsSink, ILog log)
        {
            _gameEventsSink = gameEventsSink;
            _log = log;
            _gameState = new GameState();
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
            _gameEventsSink.AfterTick(_gameState);
        }
        private void ProcessEating(Message.Tick tick)
        {
            foreach (var e in tick.Eatings)
            {
                Ball eater;
                if (!_gameState.All.TryGetValue(e.Eater, out eater))
                {
                    eater = new Ball(false);
                    _gameState.All.Add(e.Eater, eater);
                    _gameEventsSink.Appears(eater);
                }
                Ball eaten;
                if (_gameState.All.TryGetValue(e.Eaten, out eaten))
                {
                    _gameEventsSink.Eats(eater, eaten);
                    _gameState.All.Remove(e.Eaten);
                    _gameState.My.Remove(eaten);
                    _gameEventsSink.Remove(eaten);
                }
            }
        }
        private void ProcessUpdating(Message.Tick tick)
        {
            foreach (var state in tick.Updates)
            {
                Ball newGuy;
                if (!_gameState.All.TryGetValue(state.Id, out newGuy))
                {
                    newGuy = new Ball(false);
                    _gameState.All.Add(state.Id, newGuy);
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
                if (!_gameState.All.TryGetValue(ballId, out dying))
                    continue;
                if (dying.IsMine) _gameState.My.Remove(dying);
                _gameState.All.Remove(ballId);
                _gameState.My.Remove(dying);
                _gameEventsSink.Remove(dying);
            }
        }
        private void Process(Message.NewId msg)
        {
            var me = new Ball(true);
            _gameState.All.Add(msg.Id, me);
            _gameState.My.Add(me);
            me.Update(0, 0, 32, Colors.DarkOrange, false, "me");
            _gameEventsSink.Appears(me);
        }

        private void DestroyAll()
        {
            foreach (var ball in _gameState.All)
                _gameEventsSink.Remove(ball.Value);
            _gameState.All.Clear();
            _gameState.My.Clear();
        }

    }

}