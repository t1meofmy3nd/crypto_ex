import { useState } from 'react';
import Button from './ui/Button';

interface Props {
  symbol: string;
}

const OrderForm = ({ symbol }: Props) => {
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const handleSubmit = (type: 'buy' | 'sell') => {
    alert(`Вы отправили ${type === 'buy' ? 'ордер на покупку' : 'ордер на продажу'}: ${amount} ${symbol.replace('USDT','')} по цене ${price}`);
  };
  return (
    <div>
      <h3>Создание ордера</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label>
          Цена (USDT)
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={{ padding: '0.4rem', border: '1px solid #cbd5e0', borderRadius: 4 }} />
        </label>
        <label>
          Количество
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ padding: '0.4rem', border: '1px solid #cbd5e0', borderRadius: 4 }} />
        </label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button style={{ flex: 1 }} onClick={() => handleSubmit('buy')}>Купить</Button>
          <Button style={{ flex: 1 }} onClick={() => handleSubmit('sell')}>Продать</Button>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;