using static MyAgario.Message;

namespace MyAgario
{
    public sealed class Ball
    {
        public readonly bool IsMine;
        public object Tag;
        public Updates State;
        public bool IsFood => State.Size < 30;

        public Ball(bool isMine) { IsMine = isMine; }
    }
}