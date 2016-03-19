namespace MyAgario
{
    public class Ball
    {
        public readonly bool IsMine;
        public object Tag;

        public Ball(bool isMine)
        {
            IsMine = isMine;
        }
    }
}