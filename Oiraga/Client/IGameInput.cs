namespace Oiraga
{
    public interface IGameInput
    {
        void Spawn(string name);
        void MoveTo(double x, double y);
        void Spectate();
        void Split();
        void Eject();
    }
}