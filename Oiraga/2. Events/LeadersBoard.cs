namespace Oiraga
{
    public sealed class LeadersBoard : Event
    {
        public readonly Leader[] Leaders;

        public LeadersBoard(Leader[] leaders)
        {
            Leaders = leaders;
        }
    }
}