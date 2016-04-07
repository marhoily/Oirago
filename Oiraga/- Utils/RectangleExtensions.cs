using System.Windows;
using static System.Windows.Controls.Canvas;

namespace Oiraga
{
    public static class RectangleExtensions
    {
        public static Rect ToRectangle(this ViewPort w)
        {
            return new Rect(w.MaxX, w.MaxY,
                w.MinX - w.MaxX, w.MinY - w.MaxY);
        }

        public static void CenterOnCanvas(this FrameworkElement e, Vector v)
        {
            SetLeft(e, v.X - e.ActualWidth/2);
            SetTop(e, v.Y - e.ActualHeight/2);

        }
        public static void PlaceOnCanvas(this FrameworkElement e, Rect r)
        {
            SetLeft(e, r.Left);
            SetTop(e, r.Top);
            e.Width = r.Width;
            e.Height = r.Height;
        }
    }
}