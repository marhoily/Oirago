using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Shapes;

namespace MyAgario
{
    public class Ball
    {
        public readonly bool IsMine;
        public readonly SolidColorBrush SolidColorBrush;
        public readonly Ellipse Ellipse;
        public readonly TextBlock TextBlock;

        public Ball(bool isMine)
        {
            IsMine = isMine;
            SolidColorBrush = new SolidColorBrush();
            Ellipse = new Ellipse { Fill = SolidColorBrush };
            TextBlock = new TextBlock {FontSize = 40, Visibility = Visibility.Collapsed};
        }
    }
}