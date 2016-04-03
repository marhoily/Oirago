namespace Oiraga
{
    public sealed class Ball
    {
        public readonly bool IsMine;
        public object Tag;
        public Message.Update State;
        public bool IsFood => State.Size < 30;

        public Ball(bool isMine) { IsMine = isMine; }
    }
}