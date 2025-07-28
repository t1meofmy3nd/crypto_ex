import { useState } from 'react';
import Chart from '../components/Chart';
import OrderBook from '../components/OrderBook';
import OrderForm from '../components/OrderForm';

const TradePage = () => {
  const [symbol, setSymbol] = useState('BTCUSDT');
  const balance = 10000; // mock available balance

  return (
    <div>
      <h1 style={{ marginBottom: '1rem' }}>Спот торговля</h1>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Выберите пару:
          <select value={symbol} onChange={(e) => setSymbol(e.target.value)} style={{ marginLeft: '0.5rem', padding: '0.25rem' }}>
            <option value="BTCUSDT">BTC/USDT</option>
            <option value="ETHUSDT">ETH/USDT</option>
            <option value="BNBUSDT">BNB/USDT</option>
            <option value="XRPUSDT">XRP/USDT</option>
          </select>
        </label>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
        <div>
          <Chart symbol={`BINANCE:${symbol}`} />
        </div>
        <div>
          <OrderBook symbol={symbol} />
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <p>Доступный баланс: {balance.toLocaleString()} USDT</p>
        <OrderForm symbol={symbol} />
      </div>
    </div>
  );
};

export default TradePage;