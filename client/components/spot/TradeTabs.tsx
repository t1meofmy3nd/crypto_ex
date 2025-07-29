import { useState } from 'react';
import TradeChart from './TradeChart';
import OrderBook from './OrderBook';

interface Props {
  symbol: string;
}

const TradeTabs = ({ symbol }: Props) => {
  const [tab, setTab] = useState<'chart' | 'info' | 'data' | 'book'>('chart');
  const tabs: { key: typeof tab; label: string }[] = [
    { key: 'chart', label: 'График' },
    { key: 'info', label: 'Инфо' },
    { key: 'data', label: 'Торговые данные' },
    { key: 'book', label: 'Order Book' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: '0.25rem 0.5rem',
              background: tab === t.key ? 'var(--accent-color)' : 'var(--card-bg)',
              color: tab === t.key ? '#fff' : 'var(--text-color)',
              border: '1px solid var(--border-color)',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tab === 'chart' && <TradeChart symbol={symbol} />}
      {tab === 'info' && (
        <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 4 }}>
          Информация о торговой паре.
        </div>
      )}
      {tab === 'data' && (
        <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 4 }}>
          Статистика и торговые данные.
        </div>
      )}
      {tab === 'book' && (
        <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 4 }}>
          <OrderBook symbol={symbol} large />
        </div>
      )}
    </div>
  );
};

export default TradeTabs;