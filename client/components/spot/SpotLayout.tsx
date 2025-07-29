import { useState } from 'react';
import OrderBook from './OrderBook';
import TradeChart from './TradeChart';
import TradeForm from './TradeForm';
import MarketPairs from './MarketPairs';
import TradeHistory from './TradeHistory';
import OpenOrdersTabs from './OpenOrdersTabs';

const SpotLayout = () => {
  const [symbol, setSymbol] = useState('BTCUSDT');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '1rem' }}>
      <div>
        <OrderBook symbol={symbol} />
      </div>
      <div>
        <TradeChart symbol={symbol} />
        <div style={{ marginTop: '1rem' }}>
          <TradeForm symbol={symbol} />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <OpenOrdersTabs />
        </div>
      </div>
      <div>
        <MarketPairs onSelect={setSymbol} />
        <div style={{ marginTop: '1rem' }}>
          <TradeHistory symbol={symbol} />
        </div>
      </div>
    </div>
  );
};

export default SpotLayout;