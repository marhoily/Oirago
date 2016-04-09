namespace Oiraga
{
    public sealed class Elastic
    {
        private double _value = 1;
        private double? _override;
        private double _elasticityTarget = 10;
        private double _elasticity = 10;

        public bool IsOverriden
        {
            get { return _override.HasValue; }
            set
            {
                if (_override.HasValue == value) return;
                if (value)
                {
                    _override = .03;
                    _elasticityTarget = 2;
                }
                else
                {
                    _override = null;
                    _elasticityTarget = 10;
                }
            }
        }


        public double Update(double value)
        {
            _elasticity = (_elasticityTarget + _elasticity)/2;
            return _value = (_value*(_elasticity - 1) +
                _override.GetValueOrDefault(value))/_elasticity;
        }
    }
}