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
              <td style={{ textTransform: 'capitalize' }}>{o.type}</td>
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