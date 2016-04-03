using System.IO;
using System.Text;

namespace Oiraga
{
    public static class BinaryReaderExtensions
    {
        public static string ReadAsciiString(this BinaryReader reader)
        {
            var sb = new StringBuilder();
            while (true)
            {
                var ch = reader.ReadByte();
                if (ch == 0) break;
                sb.Append((char)ch);
            }
            return sb.ToString();
        }
        public static string ReadUnicodeString(this BinaryReader reader)
        {
            var sb = new StringBuilder();
            while (true)
            {
                var ch = reader.ReadUInt16();
                if (ch == 0) break;
                sb.Append((char)ch);
            }
            return sb.ToString();
        }
    }
}