using System;

namespace Oiraga
{
    public interface IGameClient
    {
        void Spawn(string name);
        void MoveTo(double x, double y);
        void Spectate();
        void Split();
        void Eject();
        event EventHandler<Message> OnMessage;
        bool IsSynchronous { get; }
        void Dispose();
    }
}