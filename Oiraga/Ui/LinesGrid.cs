using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Shapes;

namespace Oiraga
{
    public sealed class LinesGrid : Canvas
    {
        public LinesGrid()
        {
            const int k = 1000;
            const int th = 30;
            const int m = 15;
            var brush = new SolidColorBrush(Color.FromRgb(20, 20, 20));
            for (var i = -m; i <= m; i++)
            {
                Children.Add(
                    new Line
                    {
                        X1 = -m * k,
                        X2 = m * k,
                        Y1 = i * k,
                        Y2 = i * k,
                        Stroke = brush,
                        StrokeThickness = th,
                        UseLayoutRounding = true
                    });
                Children.Add(
                    new Line
                    {
                        Y1 = -m * k,
                        Y2 = m * k,
                        X1 = i * k,
                        X2 = i * k,
                        Stroke = brush,
                        StrokeThickness = th,
                        UseLayoutRounding = true
                    });
            }
        }
    }
}