using System;
using System.IO;

namespace Oiraga
{
    public sealed class EventsRecorder : IDisposable
    {
        private readonly BinaryWriter _fileStream =
            new BinaryWriter(File.Create("rec.bin"));

        public void Save(byte[] rawData)
        {
            _fileStream.Write(rawData.Length);
            _fileStream.Write(rawData);
        }

        public void Dispose() => _fileStream.Dispose();
    }
}