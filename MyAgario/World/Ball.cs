namespace MyAgario
{
    public sealed class Ball
    {
        public readonly bool IsMine;
        public object Tag;
        public Message.Updates State;

        public Ball(bool isMine)
        {
            IsMine = isMine;
        }
    }
}