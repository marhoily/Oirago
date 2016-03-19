namespace MyAgario
{
    public interface IWindowAdapter
    {
        void Appears(Ball newGuy);
        void Update(Ball newGuy, Spectate world);
        void Eats(Ball eater, Ball eaten);
        void Remove(Ball dying);
    }
}