using System;

namespace MyAgario
{
    internal static class Packet
    {
        private static readonly byte[] X2 = new byte[2];
        private static readonly byte[] X4 = new byte[4];
        private static readonly byte[] X8 = new byte[8];

        public static short ReadSInt16Le(byte[] buffer, ref int index)
        {
            if (index > buffer.Length - 2)
                return 0;
            Array.Copy(buffer, index, X2, 0, 2);
            if (BitConverter.IsLittleEndian == false)
                Array.Reverse(X2);
            index += 2;
            return BitConverter.ToInt16(X2, 0);
        }

        public static int ReadSInt32Le(byte[] buffer, ref int index)
        {
            if (index > buffer.Length - 4)
                return 0;
            
            Array.Copy(buffer, index, X4, 0, 4);
            if (BitConverter.IsLittleEndian == false)
                Array.Reverse(X4);
            index += 4;
            return BitConverter.ToInt32(X4, 0);
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
            Array.Copy(buffer, index, X2, 0, 2);

            if (BitConverter.IsLittleEndian == false)
                Array.Reverse(X2);
            index += 2;
            return BitConverter.ToUInt16(X2, 0);
        }

        public static uint ReadUInt32Le(byte[] buffer, ref int index)
        {
            if (index > buffer.Length - 4)
                return 0;
            Array.Copy(buffer, index, X4, 0, 4);
            if (BitConverter.IsLittleEndian == false)
                Array.Reverse(X4);
            index += 4;
            return BitConverter.ToUInt32(X4, 0);
        }

        public static float ReadFloatLe(byte[] buffer, ref int index)
        {
            if (index > buffer.Length - 4)
                return 0.0f;
            Array.Copy(buffer, index, X4, 0, 4);
            if (BitConverter.IsLittleEndian == false)
                Array.Reverse(X4);
            index += 4;
            return BitConverter.ToSingle(X4, 0);
        }

        public static double ReadDoubleLe(byte[] buffer, ref int index)
        {
            if (index > buffer.Length - 8)
                return 0.0;
            Array.Copy(buffer, index, X8, 0, 8);
            if (BitConverter.IsLittleEndian == false)
                Array.Reverse(X8);
            index += 8;
            return BitConverter.ToDouble(X8, 0);
        }
    }
}