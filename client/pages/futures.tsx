import { useState } from 'react';
import Chart from '../components/Chart';
import OrderBook from '../components/OrderBook';
import OrderForm from '../components/OrderForm';

const FuturesPage = () => {
  const [symbol, setSymbol] = useState('BTCUSDT');
  const [leverage, setLeverage] = useState(10);
  const balance = 5000; // mock margin balance

  return (
    <div>
      <h1 style={{ marginBottom: '1rem' }}>Фьючерсы</h1>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <div>
          <label>
            Пара:
            <select value={symbol} onChange={(e) => setSymbol(e.target.value)} style={{ marginLeft: '0.5rem', padding: '0.25rem' }}>
              <option value="BTCUSDT">BTC/USDT</option>
              <option value="ETHUSDT">ETH/USDT</option>
              <option value="BNBUSDT">BNB/USDT</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Плечо:
            <input type="number" value={leverage} min={1} max={100} onChange={(e) => setLeverage(Number(e.target.value))} style={{ marginLeft: '0.5rem', width: '4rem' }} />
            x
          </label>
        </div>
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
        <p>Маржинальный баланс: {balance.toLocaleString()} USDT</p>
        <p>Плечо: {leverage}x</p>
        <OrderForm symbol={symbol} />
      </div>
    </div>
  );
};

export default FuturesPage;