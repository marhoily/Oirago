namespace Oiraga
{
    public interface ICommandsSink
    {
        void Spawn(string name);
        void MoveTo(double x, double y);
        void Spectate();
        void Split();
        void Eject();
    }
}