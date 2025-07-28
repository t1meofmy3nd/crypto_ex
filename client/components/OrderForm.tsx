import { useState } from 'react';

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
          <button onClick={() => handleSubmit('buy')} style={{ flex: 1, padding: '0.5rem', backgroundColor: '#38a169', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Купить</button>
          <button onClick={() => handleSubmit('sell')} style={{ flex: 1, padding: '0.5rem', backgroundColor: '#e53e3e', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Продать</button>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;