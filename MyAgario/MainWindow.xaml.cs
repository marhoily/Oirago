using System.Windows;

namespace MyAgario
{
    public partial class MainWindow 
    {
        private AgarioClient _agarioClient;

        public MainWindow()
        {
            InitializeComponent();
        }

        private void MainWindow_OnLoaded(object sender, RoutedEventArgs e)
        {
            _agarioClient = new AgarioClient(Outer, Inner);
            _agarioClient.Spectate();
        }
    }
}
