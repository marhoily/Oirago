namespace MyAgario
{
    public sealed class Tick : Message
    {
        public readonly Eating[] Eatings;
        public readonly Updates[] Updateses;
        public readonly uint[] Disappearances;

        public Tick(Eating[] eatings, 
            Updates[] updateses, uint[] disappearances)
        {
            Eatings = eatings;
            Updateses = updateses;
            Disappearances = disappearances;
        }
    }
}