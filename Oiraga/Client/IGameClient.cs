namespace Oiraga
{
    public interface IGameClient 
    {
        IGameInput Input { get; }
        IEventsFeed RawOutput { get; }
    }
}