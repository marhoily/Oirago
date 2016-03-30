using System.Windows;
using System.Windows.Controls;

namespace MyAgario
{
    public static class RectangleExtensions
    {
        public static Rect ToRectangle(this Message.ViewPort w)
        {
            return new Rect(w.MaxX, w.MaxY,
                w.MinX - w.MaxX, w.MinY - w.MaxY);
        }

        public static void SetOnCanvas(this FrameworkElement e, Rect r)
        {
            Canvas.SetLeft(e, r.Left);
            Canvas.SetTop(e, r.Top);
            e.Width = r.Width;
            e.Height = r.Height;
        }
    }
}