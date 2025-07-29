import { useState } from 'react';
import Chart from '../components/Chart';
import OrderBook from '../components/OrderBook';
import OrderForm from '../components/OrderForm';
import TradeHistory from '../components/TradeHistory';
import PairSearch from '../components/PairSearch';
import TradeTabs from '../components/TradeTabs';
import Card from '../components/ui/Card';

const TradePage = () => {
  const [symbol, setSymbol] = useState('BTCUSDT');
  const balance = 10000; // mock available balance

  return (
    <div>
      <h1 style={{ marginBottom: '1rem' }}>Спот торговля</h1>
       <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '1rem' }}>
        <div>
          <Card>
            <Chart symbol={`BINANCE:${symbol}`} />
          </Card>
          <Card style={{ marginTop: '1rem' }}>
            <p>Доступный баланс: {balance.toLocaleString()} USDT</p>
            <OrderForm symbol={symbol} />
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Card>
            <OrderBook symbol={symbol} />
          </Card>
          <Card>
            <TradeHistory symbol={symbol} />
          </Card>
          <Card>
            <PairSearch onSelect={setSymbol} />
          </Card>
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <TradeTabs />
      </div>
    </div>
  );
};

export default TradePage;