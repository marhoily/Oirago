using System.Windows.Controls;

namespace MyAgario
{
    public sealed class WindowAdapter : IWindowAdapter
    {
        private readonly Canvas _outer;
        private readonly Canvas _inner;
        private readonly TextBlock _center;

        public WindowAdapter(Canvas outer, Canvas inner)
        {
            _outer = outer;
            _inner = inner;
            _center = new TextBlock {FontSize = 13};
            _outer.Children.Add(_center);
        }

        public void Appears(Ball newGuy)
        {
            var ballUi = new BallUi();
            newGuy.Tag = ballUi;
            _inner.Children.Add(ballUi.Ellipse);
            _inner.Children.Add(ballUi.TextBlock);
        }
        public void Update(Ball newGuy, Message.Spectate world)
        {
            ((BallUi) newGuy.Tag).Update(newGuy.State, world);
        }

        public void Eats(Ball eater, Ball eaten)
        {
        }

        public void Remove(Ball dying)
        {
            var ballUi = (BallUi)dying.Tag;
            _inner.Children.Remove(ballUi.Ellipse);
            _inner.Children.Remove(ballUi.TextBlock);
        }

        public void DrawCenter(double zoom)
        {
            _center.Text = $"zoom: {zoom:F1}";
        }
    }
}