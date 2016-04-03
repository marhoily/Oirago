using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;

namespace Oiraga
{
    public static class PointExtensions
    {
        public static Point Average<T>(this IEnumerable<T> source, Func<T, Point> select)
        {
            var count = 0;
            var sumX = 0.0;
            var sumY = 0.0;
            foreach (var point in source)
            {
                count++;
                var p = select(point);
                sumX += p.X;
                sumY += p.Y;
            }
            return new Point(sumX/count, sumY/count);
        }
    }
    public static class RectangleExtensions
    {
        public static Rect ToRectangle(this Event.ViewPort w)
        {
            return new Rect(w.MaxX, w.MaxY,
                w.MinX - w.MaxX, w.MinY - w.MaxY);
        }

        public static void CenterOnCanvas(this FrameworkElement e, Vector v)
        {
            Canvas.SetLeft(e, v.X - e.ActualWidth/2);
            Canvas.SetTop(e, v.Y - e.ActualHeight/2);

        }
        public static void PlaceOnCanvas(this FrameworkElement e, Rect r)
        {
            Canvas.SetLeft(e, r.Left);
            Canvas.SetTop(e, r.Top);
            e.Width = r.Width;
            e.Height = r.Height;
        }
    }
}