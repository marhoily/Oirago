using System;

namespace MyAgario
{
    public interface IAgarioClient
    {
        void Spawn(string name);
        void MoveTo(double x, double y);
        void Spectate();
        void Split();
        void Eject();
        event EventHandler<Message> OnMessage;
        void Dispose();
    }
}