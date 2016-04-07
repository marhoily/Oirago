namespace Oiraga
{
    public struct Eating
    {
        public readonly uint Eater;
        public readonly uint Eaten;

        public Eating(uint eater, uint eaten)
        {
            Eater = eater;
            Eaten = eaten;
        }
    }
}