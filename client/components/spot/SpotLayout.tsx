import { useState } from 'react';
import OrderBook from './OrderBook';
import TradeTabs from './TradeTabs';
import TradeForm from './TradeForm';
import MarketPairsPanel from './MarketPairsPanel';
import RecentTrades from './RecentTrades';
import OrdersTabs from './OrdersTabs';

const SpotLayout = () => {
  const [symbol, setSymbol] = useState('BTCUSDT');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '1rem' }}>
      <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, padding: '0.5rem', background: 'var(--card-bg)' }}>
        <OrderBook symbol={symbol} />
      </div>
      <div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, padding: '0.5rem', background: 'var(--card-bg)' }}>
          <TradeTabs symbol={symbol} />
        </div>
        <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, padding: '0.5rem', background: 'var(--card-bg)' }}>
          <TradeForm symbol={symbol} />
        </div>
        <OrdersTabs />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, padding: '0.5rem', background: 'var(--card-bg)' }}>
          <MarketPairsPanel onSelect={setSymbol} />
        </div>
        <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, padding: '0.5rem', background: 'var(--card-bg)' }}>
          <RecentTrades symbol={symbol} />
        </div>
      </div>
    </div>
  );
};

export default SpotLayout;