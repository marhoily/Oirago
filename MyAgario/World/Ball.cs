namespace Oiraga
{
    public sealed class Ball
    {
        public readonly bool IsMine;
        public object Tag;
        public Message.Updates State;
        public bool IsFood => State.Size < 30;

        public Ball(bool isMine) { IsMine = isMine; }
    }
}