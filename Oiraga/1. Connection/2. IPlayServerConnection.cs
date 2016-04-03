namespace Oiraga
{
    public interface IPlayServerConnection 
    {
        ICommandsSink Input { get; }
        IEventsFeed Output { get; }
    }
}