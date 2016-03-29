﻿using System;
using System.IO;
using System.Windows.Threading;

namespace MyAgario
{
    public class AgarioPlayback : IAgarioClient
    {
        public AgarioPlayback(IWindowAdapter windowAdapter, World world)
        {
            var processor = new MessageProcessor(windowAdapter, world);
            var stream = new BinaryReader(File.OpenRead("rec.bin"));
            GC.KeepAlive(new DispatcherTimer(
                TimeSpan.FromMilliseconds(10),
                DispatcherPriority.Normal,
                (s, e) =>
                {
                    for (var i = 0; i < 1; i++)
                    {
                        if (stream.BaseStream.Length == stream.BaseStream.Position) return;
                        var packetLength = stream.ReadInt32();
                        var p = new Packet(stream.ReadBytes(packetLength));
                        var msg = p.ReadMessage();
                        if (msg == null) throw new Exception("buffer of length 0");
                        else processor.ProcessMessage(msg);
                    }
                }, Dispatcher.CurrentDispatcher));
        }

        public void Spawn(string name)
        {
        }

        public void MoveTo(double x, double y)
        {
        }

        public void Spectate()
        {
        }

        public void Split()
        {
        }

        public void Eject()
        {
        }

        public event EventHandler<Message> OnMessage;
    }
}