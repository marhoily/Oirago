using System.Windows;

namespace MyAgario
{
    public partial class MainWindow
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void OnContentChanged1(object sender, RoutedEventArgs e)
        {
            AgarioControl.Focus();

        }
    }
}
