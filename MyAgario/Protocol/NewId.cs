namespace MyAgario
{
    public sealed class NewId : Message
    {
        public readonly uint Id;

        public NewId(uint id)
        {
            Id = id;
        }
    }
}