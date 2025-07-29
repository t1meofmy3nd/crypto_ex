import { useState } from 'react';
import Card from '../ui/Card';
import { useAuth } from '../../context/AuthContext';

const tabs = ['Открытые ордера', 'История ордеров', 'История сделок', 'Средства', 'Боты'];

const OpenOrdersTabs = () => {
  const [active, setActive] = useState(0);
  const { token } = useAuth();

  if (!token) {
    return <Card>Авторизуйтесь, чтобы начать торговать.</Card>;
  }

  return (
    <Card>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
        {tabs.map((t, idx) => (
          <button
            key={t}
            onClick={() => setActive(idx)}
            style={{
              padding: '0.25rem 0.5rem',
              background: active === idx ? 'var(--accent-color)' : 'var(--card-bg)',
              color: active === idx ? '#fff' : 'var(--text-color)',
              border: '1px solid var(--border-color)',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            {t}
          </button>
        ))}
      </div>
      <div style={{ minHeight: 80 }}>Пусто</div>
    </Card>
  );
};

export default OpenOrdersTabs;