namespace Oiraga
{
    public static class BallExtensions
    {
        public static bool IsFood(this IBall ball) => ball.Size < 30;

    }
}