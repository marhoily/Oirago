using System;
using System.Text;

namespace Oiraga
{
    public class Packet
    {
        private readonly byte[] _buffer;
        private int _offset;

        public Packet(byte[] buffer)
        {
            _buffer = buffer;
        }

        private static readonly byte[] X2 = new byte[2];
        private static readonly byte[] X4 = new byte[4];
        private static readonly byte[] X8 = new byte[8];
        public int Length => _buffer.Length;

        public short ReadShort()
        {
            if (_offset > _buffer.Length - 2)
                return 0;
            Array.Copy(_buffer, _offset, X2, 0, 2);
            if (BitConverter.IsLittleEndian == false)
                Array.Reverse(X2);
            _offset += 2;
            return BitConverter.ToInt16(X2, 0);
        }

        public int ReadInt()
        {
            if (_offset > _buffer.Length - 4)
                return 0;
            
            Array.Copy(_buffer, _offset, X4, 0, 4);
            if (BitConverter.IsLittleEndian == false)
                Array.Reverse(X4);
            _offset += 4;
            return BitConverter.ToInt32(X4, 0);
        }

        public byte ReadByte()
        {
            if (_offset > _buffer.Length - 1)
                return 0;
            var b = _buffer[_offset];
            _offset++;
            return b;
        }

        public ushort ReadUShort()
        {
            if (_offset > _buffer.Length - 2)
                return 0;
            Array.Copy(_buffer, _offset, X2, 0, 2);

            if (BitConverter.IsLittleEndian == false)
                Array.Reverse(X2);
            _offset += 2;
            return BitConverter.ToUInt16(X2, 0);
        }

        public uint ReadUInt()
        {
            if (_offset > _buffer.Length - 4)
                return 0;
            Array.Copy(_buffer, _offset, X4, 0, 4);
            if (BitConverter.IsLittleEndian == false)
                Array.Reverse(X4);
            _offset += 4;
            return BitConverter.ToUInt32(X4, 0);
        }

        public float ReadFloat()
        {
            if (_offset > _buffer.Length - 4)
                return 0.0f;
            Array.Copy(_buffer, _offset, X4, 0, 4);
            if (BitConverter.IsLittleEndian == false)
                Array.Reverse(X4);
            _offset += 4;
            return BitConverter.ToSingle(X4, 0);
        }

        public double ReadDouble()
        {
            if (_offset > _buffer.Length - 8)
                return 0.0;
            Array.Copy(_buffer, _offset, X8, 0, 8);
            if (BitConverter.IsLittleEndian == false)
                Array.Reverse(X8);
            _offset += 8;
            return BitConverter.ToDouble(X8, 0);
        }

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
        public void Forward(uint readUInt32Le)
        {
            _offset += (int)readUInt32Le;
        }
    }
}