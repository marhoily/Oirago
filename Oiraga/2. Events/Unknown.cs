namespace Oiraga
{
    public sealed class Unknown : Event
    {
        public readonly byte PacketId;

        public Unknown(byte packetId)
        {
            PacketId = packetId;
        }
    }
}