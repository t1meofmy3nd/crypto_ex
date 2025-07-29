import { useEffect, useState } from 'react';

interface Order {
  price: number;
  amount: number;
  type: 'bid' | 'ask';
}

interface Props {
  symbol: string;
}

// Simple mock order book component. In a real application this would use a WebSocket or API.
const OrderBook = ({ symbol }: Props) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Generate mock orders when symbol changes
    const bids: Order[] = Array.from({ length: 10 }).map(() => ({
      price: Number((Math.random() * 1000 + 1000).toFixed(2)),
      amount: Number((Math.random() * 5).toFixed(3)),
      type: 'bid'
    }));
    const asks: Order[] = Array.from({ length: 10 }).map(() => ({
      price: Number((Math.random() * 1000 + 1000).toFixed(2)),
      amount: Number((Math.random() * 5).toFixed(3)),
      type: 'ask'
    }));
    setOrders([...bids.sort((a, b) => b.price - a.price), ...asks.sort((a, b) => a.price - b.price)]);
  }, [symbol]);

  const maxAmount = orders.reduce((m, o) => Math.max(m, o.amount), 0);

  return (
    <div>
      <h3>Стакан ордеров</h3>
      <table style={{ width: '100%', fontSize: '0.9rem' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Тип</th>
            <th>Цена</th>
            <th>Кол-во</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, idx) => (
            <tr key={idx} style={{ color: o.type === 'bid' ? '#38a169' : '#e53e3e' }}>
              <td style={{ textTransform: 'capitalize', position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${(o.amount / maxAmount) * 100}%`,
                    background: o.type === 'bid' ? 'rgba(56,161,105,0.2)' : 'rgba(229,62,62,0.2)',
                  }}
                />
                <span style={{ position: 'relative', paddingLeft: '0.25rem' }}>{o.type}</span>
              </td>
              <td style={{ textAlign: 'right' }}>{o.price.toLocaleString()}</td>
              <td style={{ textAlign: 'right' }}>{o.amount.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderBook;