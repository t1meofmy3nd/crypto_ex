import { useEffect, useState } from 'react';

interface Level {
  price: number;
  qty: number;
}

interface Props {
  symbol: string;
  large?: boolean;
}

const OrderBook = ({ symbol, large }: Props) => {
  const [bids, setBids] = useState<Level[]>([]);
  const [asks, setAsks] = useState<Level[]>([]);
  const [last, setLast] = useState<number | null>(null);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth`);
    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.b) {
          setBids(
            (data.b as [string, string][])
              .slice(0, large ? 20 : 10)
              .map(([p, q]) => ({ price: parseFloat(p), qty: parseFloat(q) }))
          );
        }
        if (data.a) {
          setAsks(
            (data.a as [string, string][])
              .slice(0, large ? 20 : 10)
              .map(([p, q]) => ({ price: parseFloat(p), qty: parseFloat(q) }))
          );
        }
      } catch {
        // ignore
      }
    };
    return () => ws.close();
    }, [symbol, large]);

  useEffect(() => {
    if (!bids.length || !asks.length) return;
    const mid = (bids[0].price + asks[0].price) / 2;
    if (last !== null) {
      if (mid > last) setDirection('up');
      else if (mid < last) setDirection('down');
    }
    setLast(mid);
  }, [bids, asks]);

  const maxQty = Math.max(
    ...bids.map((b) => b.qty),
    ...asks.map((a) => a.qty),
    0
  );

  const row = (l: Level, type: 'bid' | 'ask') => (
    <tr key={`${type}${l.price}`} style={{ color: type === 'bid' ? '#0ECB81' : '#E53555', position: 'relative' }}>
      <td>{l.price.toFixed(2)}</td>
      <td>{l.qty.toFixed(6)}</td>
      <td style={{ width: 0, padding: 0 }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: type === 'bid' ? 0 : undefined,
            left: type === 'ask' ? 0 : undefined,
            height: '100%',
            width: `${(l.qty / maxQty) * 100}%`,
            background: type === 'bid' ? 'rgba(14,203,129,0.2)' : 'rgba(229,53,85,0.2)',
          }}
        />
      </td>
    </tr>
  );

  return (
    <div className="orderbook">
      <h3 style={{ marginBottom: '0.5rem' }}>Order Book</h3>
      <table style={{ width: '100%', fontSize: '0.8rem', position: 'relative' }}>
        <thead>
          <tr>
            <th>Price(USDT)</th>
            <th>Amount</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {asks.slice().reverse().map((l) => row(l, 'ask'))}
          <tr>
            <td colSpan={3} style={{ textAlign: 'center', color: direction === 'up' ? '#0ECB81' : '#E53555' }}>
              {last?.toFixed(2)}
            </td>
          </tr>
          {bids.map((l) => row(l, 'bid'))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderBook;