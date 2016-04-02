using System.Windows;
using System.Windows.Input;

namespace Oiraga
{
    public partial class MainWindow
    {
        public MainWindow()
        {
            InitializeComponent();
            var oiragaControl = new OiragaControl();
            Content = oiragaControl;
            oiragaControl.Focus();
        }

        private void OnKeyDown(object sender, KeyEventArgs e)
        {
            if (e.Key != Key.F11) return;
            if (WindowStyle != WindowStyle.None)
            {
                WindowStyle = WindowStyle.None;
                WindowState = WindowState.Maximized;
            }
            else
            {
                WindowState = WindowState.Normal;
                WindowStyle = WindowStyle.SingleBorderWindow;
            }
        }
    }
}
