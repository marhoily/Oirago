namespace Oiraga
{
    public interface IPlayServerConnection 
    {
        ICommandsSink Input { get; }
        IEventsFeed RawOutput { get; }
    }
}