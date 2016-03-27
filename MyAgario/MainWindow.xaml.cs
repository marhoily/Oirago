﻿using System;
using System.Diagnostics;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Threading;
using static System.Double;

namespace MyAgario
{
    public partial class MainWindow : IWindowAdapter
    {
        private AgarioClient _agarioClient;

        public MainWindow()
        {
            InitializeComponent();
            GC.KeepAlive(new DispatcherTimer(
                TimeSpan.FromMilliseconds(40),
                DispatcherPriority.Background, On, Dispatcher)
            {
                IsEnabled = true
            });
        }


        private double _t;
        private bool _spawn = true;
        private bool _first = true;
        private void On(object sender, EventArgs e)
        {
            var firstOrDefault = _agarioClient.World.MyBalls.FirstOrDefault();
            if (firstOrDefault == null)
            {
                if (_spawn)
                {
                    _first = true;
                    _spawn = false;
                    _agarioClient.Spawn("blah");
                }
                return;
            }
            if (_first)
            {
                _spawn = true;
                _first = false;
            }
            var b = firstOrDefault.State;

            var calcZoom = CalcZoom();
            if (!IsNaN(calcZoom))
                _scale.ScaleX = _scale.ScaleY = Scale.Value + calcZoom;
            var translateTargetX = OffsetX.Value - b.X;
            _translate.X = (translateTargetX + _translate.X)/2;
            var translateTargetY = OffsetY.Value - b.Y;
            _translate.Y = (translateTargetY + _translate.Y)/2;
            //_agarioClient.MoveTo(5+10 * Math.Sin(_t), 5+10 * Math.Cos(_t));
            var position = Mouse.GetPosition(Border);
            //Trace.WriteLine($"{b.X}: {b.Y}");
            var dx = position.X - Border.ActualWidth/2;
            var dy = position.Y - Border.ActualHeight / 2;

            var d = Math.Sqrt(dx*dx + dy*dy);
            dx = (dx/d)*100.0;
            dy = (dy/d)*100.0;
            _agarioClient.MoveTo(dx,dy);
            //_agarioClient.Adapter.Print($"{dx:f3}: {dy:f3}");
            _t += .02;
        }

        private double CalcZoom()
        {
            if (_agarioClient.World.MyBalls.Count == 0) return NaN;
            var totalSize = _agarioClient.World.MyBalls.Sum(x => x.State.Size);
            return
                Math.Pow(Math.Min(64.0 / totalSize, 1), 0.4) *
                Math.Max(Border.ActualHeight / 1080, Border.ActualWidth / 1920);
        }

        private void MainWindow_OnLoaded(object sender, RoutedEventArgs e)
        {
            _agarioClient = new AgarioClient(this);
            //_agarioClient.Spawn("blah");
            //_agarioClient.Spectate();
        }

        private void MainWindow_OnSizeChanged(object sender, SizeChangedEventArgs e)
        {
            OffsetX.Value = Border.ActualWidth;
            OffsetY.Value = Border.ActualHeight;
        }

        public void Appears(Ball newGuy)
        {
            var ballUi = new BallUi();
            newGuy.Tag = ballUi;
            Inner.Children.Add(ballUi.Ellipse);
            Inner.Children.Add(ballUi.TextBlock);
        }
        public void Update(Ball newGuy, Message.Spectate world)
        {
            ((BallUi)newGuy.Tag).Update(newGuy.State, world);
        }

        public void Eats(Ball eater, Ball eaten)
        {
        }

        public void Remove(Ball dying)
        {
            var ballUi = (BallUi)dying.Tag;
            Inner.Children.Remove(ballUi.Ellipse);
            Inner.Children.Remove(ballUi.TextBlock);
        }

        public void Print(string text)
        {
        }
    }
}
