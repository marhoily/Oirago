using System;

namespace Oiraga
{
    public interface IGameRawOutut
    {
        event EventHandler<Message> OnMessage;
        bool IsSynchronous { get; }
    }
    public interface IGameInput
    {
        void Spawn(string name);
        void MoveTo(double x, double y);
        void Spectate();
        void Split();
        void Eject();
    }
}