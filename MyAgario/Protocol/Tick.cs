namespace MyAgario
{
    public struct Tick
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