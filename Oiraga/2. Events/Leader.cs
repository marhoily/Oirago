namespace Oiraga
{
    public sealed class Leader
    {
        public readonly uint Id;
        public readonly string Name;

        public Leader(uint id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}