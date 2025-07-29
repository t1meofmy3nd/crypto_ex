import { useState } from 'react';
import { useMarkets } from '../../hooks/useMarkets';

interface Props {
  onSelect: (s: string) => void;
}

const MarketPairs = ({ onSelect }: Props) => {
  const { markets } = useMarkets();
  const [base, setBase] = useState('USDT');
  const bases = ['USDT', 'BTC', 'BUSD'];

  const filtered = markets?.filter((m) => m.symbol.endsWith(base));

  return (
    <div>
      <div style={{ marginBottom: '0.5rem' }}>
        <select value={base} onChange={(e) => setBase(e.target.value)}>
          {bases.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <div style={{ maxHeight: 300, overflowY: 'auto', fontSize: '0.85rem' }}>
        {filtered?.map((m) => (
          <div
            key={m.symbol}
            onClick={() => onSelect(m.symbol)}
            style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', padding: '0.25rem 0' }}
          >
            <span>{m.symbol.replace(base, `/${base}`)}</span>
            <span>{m.price.toFixed(2)}</span>
            <span style={{ color: m.change >= 0 ? '#0ECB81' : '#E53555' }}>{m.change.toFixed(2)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPairs;