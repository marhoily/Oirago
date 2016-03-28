namespace MyAgario
{
    public sealed class Ball
    {
        public readonly bool IsMine;
        public object Tag;
        public Message.Updates State;
        public bool IsFood => State.Size < 30;

        public Ball(bool isMine) { IsMine = isMine; }

        public void Move(int dx, int dy) =>
            State = new Message.Updates(
                State.Id, State.X + dx, State.Y + dy,
                State.Size, State.R, State.G, State.B,
                State.IsVirus, State.Name);
    }
}