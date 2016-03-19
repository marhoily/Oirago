using MyAgario;

namespace Tests
{
    public sealed class NullAdapter : IWindowAdapter
    {
        public void Appears(Ball newGuy)
        {
        }

        public void Update(Ball newGuy, Message.Spectate world)
        {
        }

        public void Eats(Ball eater, Ball eaten)
        {
        }

        public void Remove(Ball dying)
        {
        }

        public void DrawCenter(double zoom)
        {
            
        }
    }
}