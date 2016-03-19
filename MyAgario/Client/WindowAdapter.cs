using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;

namespace MyAgario
{
    public interface IWindowAdapter
    {
        void Update(Ball newGuy, Updates appears, Spectate world);
        void Eats(Ball eater, Ball eaten);
        void Remove(Ball dying);
    }

    public sealed class WindowAdapter : IWindowAdapter
    {
        private readonly Canvas _canvas;

        public WindowAdapter(Canvas canvas)
        {
            _canvas = canvas;
        }

        public void Appears(Ball newGuy)
        {
            var ballUi = new BallUi();
            newGuy.Tag = ballUi;
            _canvas.Children.Add(ballUi.Ellipse);
            _canvas.Children.Add(ballUi.TextBlock);
        }
        public void Update(Ball newGuy, Updates appears, Spectate world)
        {
            ((BallUi) newGuy.Tag).Update(appears, world);
        }

        public void Eats(Ball eater, Ball eaten)
        {
        }

        public void Remove(Ball dying)
        {
            var ballUi = (BallUi)dying.Tag;
            _canvas.Children.Remove(ballUi.Ellipse);
            _canvas.Children.Remove(ballUi.TextBlock);
        }
    }
}