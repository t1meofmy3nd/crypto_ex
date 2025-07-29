import { useState } from 'react';
import { useMarkets } from '../hooks/useMarkets';

interface Props {
  onSelect: (symbol: string) => void;
}

const PairSearch = ({ onSelect }: Props) => {
  const { markets } = useMarkets();
  const [query, setQuery] = useState('');

  const filtered = markets?.filter(m => m.symbol.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <input
        type="text"
        placeholder="Поиск"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ width: '100%', marginBottom: '0.5rem', padding: '0.4rem', border: '1px solid var(--border-color)', borderRadius: 4 }}
      />
      <div style={{ maxHeight: 200, overflowY: 'auto' }}>
        {filtered?.map(m => (
          <div key={m.symbol} style={{ padding: '0.25rem 0', cursor: 'pointer' }} onClick={() => onSelect(m.symbol)}>
            {m.symbol.replace('USDT','/USDT')} - {m.price.toLocaleString()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PairSearch;