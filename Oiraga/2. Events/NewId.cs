namespace Oiraga
{
    public sealed class NewId : Event
    {
        public readonly uint Id;

        public NewId(uint id)
        {
            Id = id;
        }
    }
}