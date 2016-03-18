using System;

namespace MyAgario
{
    internal static class Packet
    {
        public static short ReadSInt16Le(byte[] buffer, ref int index)
        {
            if (index > buffer.Length - 2)
                return 0;
            var b = new byte[2];
            Array.Copy(buffer, index, b, 0, 2);
            if (BitConverter.IsLittleEndian == false)
                Array.Reverse(b);
            index += 2;
            return BitConverter.ToInt16(b, 0);
        }

        public static int ReadSInt32Le(byte[] buffer, ref int index)
        {
            if (index > buffer.Length - 4)
                return 0;
            var b = new byte[4];
            Array.Copy(buffer, index, b, 0, 4);
            if (BitConverter.IsLittleEndian == false)
                Array.Reverse(b);
            index += 4;
            return BitConverter.ToInt32(b, 0);
        }

        public static byte ReadUInt8(byte[] buffer, ref int index)
        {
            if (index > buffer.Length - 1)
                return 0;
            var b = buffer[index];
            index++;
            return b;
        }

        public static ushort ReadUInt16Le(byte[] buffer, ref int index)
        {
            if (index > buffer.Length - 2)
                return 0;
            var b = new byte[2];
            Array.Copy(buffer, index, b, 0, 2);

            if (BitConverter.IsLittleEndian == false)
                Array.Reverse(b);
            index += 2;
            return BitConverter.ToUInt16(b, 0);
        }

        public static uint ReadUInt32Le(byte[] buffer, ref int index)
        {
            if (index > buffer.Length - 4)
                return 0;
            var b = new byte[4];
            Array.Copy(buffer, index, b, 0, 4);
            if (BitConverter.IsLittleEndian == false)
                Array.Reverse(b);
            index += 4;
            return BitConverter.ToUInt32(b, 0);
        }

        public static float ReadFloatLe(byte[] buffer, ref int index)
        {
            if (index > buffer.Length - 4)
                return 0.0f;
            var b = new byte[4];
            Array.Copy(buffer, index, b, 0, 4);
            if (BitConverter.IsLittleEndian == false)
                Array.Reverse(b);
            index += 4;
            return BitConverter.ToSingle(b, 0);
        }

        public static double ReadDoubleLe(byte[] buffer, ref int index)
        {
            if (index > buffer.Length - 8)
                return 0.0;
            var b = new byte[8];
            Array.Copy(buffer, index, b, 0, 8);
            if (BitConverter.IsLittleEndian == false)
                Array.Reverse(b);
            index += 8;
            return BitConverter.ToDouble(b, 0);
        }
    }
}