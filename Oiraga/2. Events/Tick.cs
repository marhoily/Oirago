namespace Oiraga
{
    public sealed class Tick : Event
    {
        public readonly Eating[] Eatings;
        public readonly Update[] Updates;
        public readonly uint[] Disappearances;

        public Tick(Eating[] eatings, Update[] updates, uint[] disappearances)
        {
            Eatings = eatings;
            Updates = updates;
            Disappearances = disappearances;
        }
    }
}