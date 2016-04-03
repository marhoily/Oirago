using System.IO;
using System.Text;

namespace Oiraga
{
    public class Packet
    {
        private readonly BinaryReader _binaryReader;

        public Packet(byte[] buffer)
        {
            _binaryReader = new BinaryReader(new MemoryStream(buffer));
        }

        public long Length => _binaryReader.BaseStream.Length;
        public short ReadShort() => _binaryReader.ReadInt16();
        public int ReadInt() => _binaryReader.ReadInt32();
        public byte ReadByte() => _binaryReader.ReadByte();
        public ushort ReadUShort() => _binaryReader.ReadUInt16();
        public uint ReadUInt() => _binaryReader.ReadUInt32();
        public float ReadFloat() => _binaryReader.ReadSingle();
        public double ReadDouble() => _binaryReader.ReadDouble();
        
        public string ReadAsciiString()
        {
            var sb = new StringBuilder();
            while (true)
            {
                var ch = ReadByte();
                if (ch == 0) break;
                sb.Append((char) ch);
            }
            return sb.ToString();
        }
        public string ReadUnicodeString()
        {
            var sb = new StringBuilder();
            while (true)
            {
                var ch = ReadUShort();
                if (ch == 0) break;
                sb.Append((char) ch);
            }
            return sb.ToString();
        }

        public void Forward(uint offset) => 
            _binaryReader.BaseStream.Seek(offset, SeekOrigin.Current);
    }
}