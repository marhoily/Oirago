namespace Oiraga
{
    public interface IGameClient 
    {
        IGameInput Input { get; }
        IGameRawOutut RawOutut { get; }
    }
}