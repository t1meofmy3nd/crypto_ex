import { useEffect, useState } from 'react';

interface Trade {
  price: number;
  qty: number;
  side: 'buy' | 'sell';
  time: string;
}

interface Props {
  symbol: string;
}

const TradeHistory = ({ symbol }: Props) => {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@trade`);
    ws.onmessage = (e) => {
      const d = JSON.parse(e.data);
      const t: Trade = {
        price: parseFloat(d.p),
        qty: parseFloat(d.q),
        side: d.m ? 'sell' : 'buy',
        time: new Date(d.T).toLocaleTimeString()
      };
      setTrades((prev) => [t, ...prev].slice(0, 30));
    };
    return () => ws.close();
  }, [symbol]);

  return (
    <div className="trade-history">
      <h3 style={{ marginBottom: '0.5rem' }}>Сделки</h3>
      <table style={{ width: '100%', fontSize: '0.8rem' }}>
        <thead>
          <tr>
            <th>Время</th>
            <th>Цена</th>
            <th>Кол-во</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((t, idx) => (
            <tr key={idx} style={{ color: t.side === 'buy' ? '#0ECB81' : '#E53555' }}>
              <td>{t.time}</td>
              <td>{t.price.toFixed(2)}</td>
              <td>{t.qty.toFixed(6)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradeHistory;