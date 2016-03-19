namespace MyAgario
{
    public sealed class Tick : Message
    {
        public readonly Eating[] Eatings;
        public readonly Appearance[] Appearances;
        public readonly uint[] Disappearances;

        public Tick(Eating[] eatings, 
            Appearance[] appearances, uint[] disappearances)
        {
            Eatings = eatings;
            Appearances = appearances;
            Disappearances = disappearances;
        }
    }
}