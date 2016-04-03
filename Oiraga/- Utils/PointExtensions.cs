using System;
using System.Collections.Generic;
using System.Windows;

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
}