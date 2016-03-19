using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Shapes;

namespace MyAgario
{
    public partial class MainWindow : Window
    {
        private AgarioClient _agarioClient;

        public MainWindow()
        {
            InitializeComponent();
        }

        private void MainWindow_OnLoaded(object sender, RoutedEventArgs e)
        {
            _agarioClient = new AgarioClient(_canvas);
            _agarioClient.Spectate();
        }
        

        private void _canvas_OnSizeChanged(object sender, SizeChangedEventArgs e)
        {
            _scale.ScaleX = .2;
            _scale.ScaleY = .2;
            _tanslate.X = _canvas.ActualWidth / 2;
            _tanslate.Y = _canvas.ActualHeight / 2;
        }

        private void MainWindow_OnKeyDown(object sender, KeyEventArgs e)
        {
            if (e.Key == Key.Delete)
                _agarioClient.Purge();
        }
    }
}
