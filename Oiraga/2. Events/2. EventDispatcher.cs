using System.Linq;
using static Oiraga.Event;

namespace Oiraga
{
    public sealed class EventDispatcher
    {
        private readonly IReceiver _sink;
        private readonly ILog _log;
        private readonly GameState _gameState;

        public EventDispatcher(IReceiver sink, ILog log)
        {
            _sink = sink;
            _log = log;
            _gameState = new GameState();
        }

        public void Dispatch(Event msg)
        {
            var tick = msg as Tick;
            if (tick != null) Dispatch(tick);

            var newId = msg as NewId;
            if (newId != null) CreateMe(newId.Id);

            //var spectate = msg as Spectate;
            //if (spectate != null) Spectate(spectate);

            var worldSize = msg as ViewPort;
            if (worldSize != null) Dispatch(worldSize);

            var destroyAllBalls = msg as DestroyAllBalls;
            if (destroyAllBalls != null) DestroyAll();

            var leadersBoard = msg as LeadersBoard;
            if (leadersBoard != null)
                _sink.Leaders(leadersBoard.Leaders.Select(x => x.Name));

            var unknown = msg as Unknown;
            if (unknown != null) _log.LogError(
                $"Unknown packet id {unknown.PacketId}");
        }

        private void Dispatch(ViewPort viewPort)
        {
            _sink.WorldSize(viewPort.ToRectangle());
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
        private void Dispatch(Tick tick)
        {
            Eat(tick.Eatings);
            Update(tick.Updates);
            Cleanup(tick.Disappearances);
            _sink.AfterTick(_gameState);
        }
        private void Eat(Eating[] eatings)
        {
            foreach (var e in eatings)
            {
                Ball eater;
                if (!_gameState.All.TryGetValue(e.Eater, out eater))
                {
                    eater = new Ball(false);
                    _gameState.All.Add(e.Eater, eater);
                    _sink.Appears(eater);
                }
                Ball eaten;
                if (_gameState.All.TryGetValue(e.Eaten, out eaten))
                {
                    _gameState.All.Remove(e.Eaten);
                    _gameState.My.Remove(eaten);
                    _sink.Remove(eaten);
                }
            }
        }
        private void Update(Update[] updates)
        {
            foreach (var state in updates)
            {
                Ball newGuy;
                if (!_gameState.All.TryGetValue(state.Id, out newGuy))
                {
                    newGuy = new Ball(false);
                    _gameState.All.Add(state.Id, newGuy);
                    _sink.Appears(newGuy);
                }
                newGuy.Pos = state.Pos;
                newGuy.Size = state.Size;
                newGuy.Color = state.Color;
                newGuy.IsVirus = state.IsVirus;
                if (!string.IsNullOrEmpty(state.Name))
                    newGuy.Name = state.Name;
            }
        }
        private void Cleanup(uint[] ballIds)
        {
            foreach (var ballId in ballIds)
            {
                Ball dying;
                if (!_gameState.All.TryGetValue(ballId, out dying))
                    continue;
                if (dying.IsMine) _gameState.My.Remove(dying);
                _gameState.All.Remove(ballId);
                _gameState.My.Remove(dying);
                _sink.Remove(dying);
            }
        }
        private void CreateMe(uint key)
        {
            var me = new Ball(true);
            _gameState.All.Add(key, me);
            _gameState.My.Add(me);
            _sink.Appears(me);
        }
        private void DestroyAll()
        {
            foreach (var ball in _gameState.All)
                _sink.Remove(ball.Value);
            _gameState.All.Clear();
            _gameState.My.Clear();
        }

    }

}