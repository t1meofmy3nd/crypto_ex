import { useState } from 'react';
import Button from '../ui/Button';

interface Props {
  symbol: string;
}

const TradeForm = ({ symbol }: Props) => {
  const [type, setType] = useState<'limit' | 'market' | 'stop'>('limit');
  const [amount, setAmount] = useState('');
  const [tpSl, setTpSl] = useState(false);

  const submit = (side: 'buy' | 'sell') => {
    alert(`${side} ${amount} ${symbol}`);
  };

  return (
    <div>
      <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
        <select value={type} onChange={(e) => setType(e.target.value as any)}>
          <option value="limit">Лимит</option>
          <option value="market">Рынок</option>
          <option value="stop">Стоп-лимит</option>
        </select>
        <label style={{ fontSize: '0.8rem' }}>
          <input type="checkbox" checked={tpSl} onChange={() => setTpSl(!tpSl)} style={{ marginRight: 4 }} /> TP/SL
        </label>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ color: '#0ECB81' }}>Покупка</h4>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Количество"
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />
          <Button style={{ width: '100%', background: '#0ECB81' }} onClick={() => submit('buy')}>
            Войти
          </Button>
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ color: '#E53555' }}>Продажа</h4>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Количество"
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />
          <Button style={{ width: '100%', background: '#E53555' }} onClick={() => submit('sell')}>
            Войти
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TradeForm;