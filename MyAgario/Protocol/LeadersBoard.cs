namespace MyAgario
{
    public sealed class LeadersBoard : Message
    {
        public readonly Leader[] Leaders;

        public LeadersBoard(Leader[] leaders)
        {
            Leaders = leaders;
        }
    }
}