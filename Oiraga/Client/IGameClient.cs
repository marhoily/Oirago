namespace Oiraga
{
    public interface IGameClient 
    {
        IGameInput Input { get; }
        IGameRawOutput RawOutput { get; }
    }
}