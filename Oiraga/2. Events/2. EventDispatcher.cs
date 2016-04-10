using System.Linq;

namespace Oiraga
{
    public sealed class EventDispatcher
    {
        private readonly IReceiver _receiver;
        private readonly ILog _log;
        private readonly GameState _gameState;

        public EventDispatcher(IReceiver receiver, ILog log)
        {
            _receiver = receiver;
            _log = log;
            _gameState = new GameState();
        }

        public void Dispatch(Event msg)
        {
            var tick = msg as Tick;
            if (tick != null)
            {
                Dispatch(tick);
                return;
            }
            var leadersBoard = msg as LeadersBoard;
            if (leadersBoard != null)
            {
                _receiver.Leaders(leadersBoard.Leaders.Select(x => x.Name));
                return;
            }

            var spectate = msg as Spectate;
            if (spectate != null)
            {
                Spectate(spectate);
                return;
            }

            var worldSize = msg as ViewPort;
            if (worldSize != null)
            {
                Dispatch(worldSize);
                return;
            }

            var destroyAllBalls = msg as DestroyAllBalls;
            if (destroyAllBalls != null)
            {
                DestroyAll();
                return;
            }

            var newId = msg as NewId;
            if (newId != null)
            {
                CreateMe(newId.Id);
                return;
            }


            var unknown = msg as Unknown;
            if (unknown != null) _log.LogError(
                $"Unknown packet id {unknown.PacketId}");
        }

        private void Dispatch(ViewPort viewPort)
        {
            _receiver.WorldSize(viewPort.ToRectangle());
        }

        private void Spectate(Spectate spectate)
        {
            _receiver.Spectate(_gameState, spectate.Center, spectate.Zoom);
            //var zoom = spectate.Zoom;
            //var dx = _world.SpectateViewPort.X - spectate.X;
            //var dy = _world.SpectateViewPort.Y - spectate.Y;
            //_world.SpectateViewPort = spectate;
            //foreach (var ball in _gameState.All.Values)
            //    if (ball.IsFood() || ball.IsVirus)
            //    {
            //        ball.Move((int)(dx * zoom), (int)(dy * zoom));
            //        _gameEventsSink.Update(ball);
            //    }
        }
        private void Dispatch(Tick tick)
        {
            Eat(tick.Eatings);
            Update(tick.Updates);
            Cleanup(tick.Disappearances);
            _receiver.AfterTick(_gameState);
        }
        private void Eat(Eating[] eatings)
        {
            foreach (var e in eatings)
            {
                Ball eater;
                if (!_gameState.AllBalls.TryGetValue(e.Eater, out eater))
                {
                    eater = new Ball(false);
                    _gameState.AllBalls.Add(e.Eater, eater);
                    _receiver.Appears(eater);
                }
                Ball eaten;
                if (_gameState.AllBalls.TryGetValue(e.Eaten, out eaten))
                {
                    _gameState.AllBalls.Remove(e.Eaten);
                    _gameState.MyBalls.Remove(eaten);
                    _receiver.Remove(eaten);
                }
            }
        }
        private void Update(Update[] updates)
        {
            foreach (var state in updates)
            {
                Ball newGuy;
                if (!_gameState.AllBalls.TryGetValue(state.Id, out newGuy))
                {
                    newGuy = new Ball(false);
                    _gameState.AllBalls.Add(state.Id, newGuy);
                    _receiver.Appears(newGuy);
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
                if (!_gameState.AllBalls.TryGetValue(ballId, out dying))
                    continue;
                if (dying.IsMine) _gameState.MyBalls.Remove(dying);
                _gameState.AllBalls.Remove(ballId);
                _gameState.MyBalls.Remove(dying);
                _receiver.Remove(dying);
            }
        }
        private void CreateMe(uint key)
        {
            var me = new Ball(true);
            _gameState.AllBalls.Add(key, me);
            _gameState.MyBalls.Add(me);
            _receiver.Appears(me);
        }
        private void DestroyAll()
        {
            foreach (var ball in _gameState.AllBalls)
                _receiver.Remove(ball.Value);
            _gameState.AllBalls.Clear();
            _gameState.MyBalls.Clear();
        }
    }
}