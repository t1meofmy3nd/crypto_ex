import { useEffect, useState } from 'react';

interface Trade {
  price: number;
  amount: number;
  side: 'buy' | 'sell';
  time: string;
}

interface Props {
  symbol: string;
}

const TradeHistory = ({ symbol }: Props) => {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    // generate mock trades whenever the symbol changes
    const gen = (): Trade[] =>
      Array.from({ length: 20 }).map(
        (): Trade => ({
          price: Number((Math.random() * 1000 + 1000).toFixed(2)),
          amount: Number((Math.random() * 5).toFixed(3)),
          side: Math.random() > 0.5 ? 'buy' : 'sell',
          time: new Date().toLocaleTimeString(),
        })
      );
    setTrades(gen());
  }, [symbol]);

  return (
    <div>
      <h3>История сделок</h3>
      <table style={{ width: '100%', fontSize: '0.9rem' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Время</th>
            <th>Цена</th>
            <th>Кол-во</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((t, idx) => (
            <tr key={idx} style={{ color: t.side === 'buy' ? '#38a169' : '#e53e3e' }}>
              <td>{t.time}</td>
              <td style={{ textAlign: 'right' }}>{t.price.toLocaleString()}</td>
              <td style={{ textAlign: 'right' }}>{t.amount.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradeHistory;