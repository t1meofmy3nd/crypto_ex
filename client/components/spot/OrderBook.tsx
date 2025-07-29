import { useEffect, useState } from 'react';

interface Level {
  price: number;
  qty: number;
}

interface Props {
  symbol: string;
}

// Live order book using Binance websocket
const OrderBook = ({ symbol }: Props) => {
  const [bids, setBids] = useState<Level[]>([]);
  const [asks, setAsks] = useState<Level[]>([]);

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth`);
    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.b) {
          setBids(
            (data.b as [string, string][])              .slice(0, 10)
              .map(([p, q]) => ({ price: parseFloat(p), qty: parseFloat(q) }))
          );
        }
        if (data.a) {
          setAsks(
            (data.a as [string, string][])              .slice(0, 10)
              .map(([p, q]) => ({ price: parseFloat(p), qty: parseFloat(q) }))
          );
        }
      } catch {
        // ignore malformed messages
      }
    };
    return () => ws.close();
  }, [symbol]);

  return (
    <div className="orderbook">
      <h3 style={{ marginBottom: '0.5rem' }}>Order Book</h3>
      <table style={{ width: '100%', fontSize: '0.8rem' }}>
        <thead>
          <tr>
            <th>Price(USDT)</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {asks.map((l) => (
            <tr key={`a${l.price}`} style={{ color: '#E53555' }}>
              <td>{l.price.toFixed(2)}</td>
              <td>{l.qty.toFixed(6)}</td>
            </tr>
          ))}
          {bids.map((l) => (
            <tr key={`b${l.price}`} style={{ color: '#0ECB81' }}>
              <td>{l.price.toFixed(2)}</td>
              <td>{l.qty.toFixed(6)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderBook;