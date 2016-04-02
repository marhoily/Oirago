using System.Windows.Media;

namespace Oiraga
{
    public static class ColorExtensions
    {
        public static Color Darker(this Color c) => Color
            .FromRgb((byte) (c.R*.5), (byte) (c.G*.5), (byte) (c.B*.5));

        public static bool IsDark(this Color t) =>
            t.R*0.2126 + t.G*0.7152 + t.B*0.0722 < 128*3;
    }
}