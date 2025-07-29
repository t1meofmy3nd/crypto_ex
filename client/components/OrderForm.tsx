import { useState } from 'react';
import Button from './ui/Button';

type Mode = 'spot' | 'margin' | 'p2p';

interface Props {
  symbol: string;
}

const OrderForm = ({ symbol }: Props) => {
  const [mode, setMode] = useState<Mode>('spot');
  const [type, setType] = useState<'limit' | 'market'>('limit');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const total = price && amount ? Number(price) * Number(amount) : 0;

  const handleSubmit = (side: 'buy' | 'sell') => {
    const p = type === 'market' ? 'рыночной цене' : `${price} USDT`;
    alert(`Отправлен ${side === 'buy' ? 'ордер на покупку' : 'ордер на продажу'} ${amount} ${symbol.replace('USDT','')} по ${p}`);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
        {(['spot','margin','p2p'] as Mode[]).map(m => (
          <Button
            key={m}
            variant={mode === m ? 'primary' : 'secondary'}
            onClick={() => setMode(m)}
          >
            {m.toUpperCase()}
          </Button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <Button variant={type === 'limit' ? 'primary' : 'secondary'} onClick={() => setType('limit')}>Лимит</Button>
        <Button variant={type === 'market' ? 'primary' : 'secondary'} onClick={() => setType('market')}>Маркет</Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {type === 'limit' && (
          <label>
            Цена (USDT)
            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              style={{ padding: '0.4rem', border: '1px solid var(--border-color)', borderRadius: 4 }}
            />
          </label>
        )}
        <label>
          Количество
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            style={{ padding: '0.4rem', border: '1px solid var(--border-color)', borderRadius: 4 }}
          />
        </label>
        <div>Сумма: {total.toLocaleString()} USDT</div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button style={{ flex: 1, background: '#38a169' }} onClick={() => handleSubmit('buy')}>
            Купить
          </Button>
          <Button style={{ flex: 1, background: '#e53e3e' }} onClick={() => handleSubmit('sell')}>
            Продать
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;