﻿using System;
using System.IO;
using System.Windows.Threading;

namespace Oiraga
{
    public class GamePlayback : IGameClient
    {
        private readonly BinaryReader _stream;
        private readonly DispatcherTimer _timer;

        public GamePlayback()
        {
            _stream = new BinaryReader(File.OpenRead("rec.bin"));
            _timer = new DispatcherTimer(
                TimeSpan.FromMilliseconds(10),
                DispatcherPriority.Normal,
                Tick, Dispatcher.CurrentDispatcher);
            Input = new NullInput();
        }

        private void Tick(object s, EventArgs e)
        {
            for (var i = 0; i < 1; i++)
            {
                if (_stream.BaseStream.Length == _stream.BaseStream.Position) return;
                var packetLength = _stream.ReadInt32();
                var p = new Packet(_stream.ReadBytes(packetLength));
                var msg = p.ReadMessage();
                if (msg == null) throw new Exception("buffer of length 0");
                OnMessage?.Invoke(this, msg);
            }
        }

        public bool IsSynchronous => true;


        public event EventHandler<Message> OnMessage;
        public void Dispose()
        {
            _timer.IsEnabled = false;
            _stream.Dispose();
        }

        public IGameInput Input { get; }
    }

    public class NullInput : IGameInput
    {
        public void Spawn(string name) { }
        public void MoveTo(double x, double y) { }
        public void Spectate() { }
        public void Split() { }
        public void Eject() { }
    }
}