import { useState } from 'react';
import Chart from '../Chart';

interface Props {
  symbol: string;
}

const TradeChart = ({ symbol }: Props) => {
  const [tab, setTab] = useState<'chart' | 'info' | 'data' | 'book'>('chart');
  const tabs: { key: typeof tab; label: string }[] = [
    { key: 'chart', label: 'График' },
    { key: 'info', label: 'Инфо' },
    { key: 'data', label: 'Торговые данные' },
    { key: 'book', label: 'Order Book' }
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
              fontSize: '0.9rem'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tab === 'chart' && <Chart symbol={`BINANCE:${symbol}`} />}
      {tab !== 'chart' && (
        <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 4 }}>
          {tab === 'info' && <div>Информация о торговой паре.</div>}
          {tab === 'data' && <div>Статистика и торговые данные.</div>}
          {tab === 'book' && <div>Order book отображается слева.</div>}
        </div>
      )}
    </div>
  );
};

export default TradeChart;