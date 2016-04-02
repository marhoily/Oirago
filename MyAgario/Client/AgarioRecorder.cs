using System.IO;

namespace Oiraga
{
    public sealed class AgarioRecorder
    {
        private readonly BinaryWriter _fileStream =
            new BinaryWriter(File.Create("rec.bin"));

        public void Save(byte[] rawData)
        {
            _fileStream.Write(rawData.Length);
            _fileStream.Write(rawData);
        }
    }
}