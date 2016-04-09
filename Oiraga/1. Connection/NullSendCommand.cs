namespace Oiraga
{
    public sealed class NullSendCommand : ISendCommand
    {
        public void Spawn(string name) { }
        public void MoveTo(double x, double y) { }
        public void Spectate() { }
        public void Split() { }
        public void Eject() { }
    }
}