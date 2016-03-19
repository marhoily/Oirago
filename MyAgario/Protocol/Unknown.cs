namespace MyAgario
{
    public sealed class Unknown : Message
    {
        public readonly byte PacketId;

        public Unknown(byte packetId)
        {
            PacketId = packetId;
        }
    }
}