using System.IO;
using System.Text;

namespace Oiraga
{
    
    public static class Ext
    {
        public static string ReadAsciiString(this BinaryReader _binaryReader)
        {
            var sb = new StringBuilder();
            while (true)
            {
                var ch = _binaryReader.ReadByte();
                if (ch == 0) break;
                sb.Append((char)ch);
            }
            return sb.ToString();
        }
        public static string ReadUnicodeString(this BinaryReader _binaryReader)
        {
            var sb = new StringBuilder();
            while (true)
            {
                var ch = _binaryReader.ReadUInt16();
                if (ch == 0) break;
                sb.Append((char)ch);
            }
            return sb.ToString();
        }
    }
}