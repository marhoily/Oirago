using System;
using System.Threading.Tasks;

namespace Oiraga
{
    public static class TaskExtensions
    {
        public static void LogErrors(this Task task, Action<string> log)
        {
            task.ContinueWith(t =>
            {
                if (t.Exception != null)
                    log(t.Exception.InnerException.Message);
            });
        }        
    }
}