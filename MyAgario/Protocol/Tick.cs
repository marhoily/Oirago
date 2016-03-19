namespace MyAgario
{
    public sealed class Tick : Message
    {
        public readonly Eating[] Eatings;
        public readonly Updates[] Updates;
        public readonly uint[] Disappearances;

        public Tick(Eating[] eatings, Updates[] updates, uint[] disappearances)
        {
            Eatings = eatings;
            Updates = updates;
            Disappearances = disappearances;
        }
    }
}