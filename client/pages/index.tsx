import Link from 'next/link';
import Chart from '../components/Chart';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useMarkets } from '../hooks/useMarkets';

export default function Home() {
  const { markets, isLoading } = useMarkets();

  return (
    <div>
      <section style={{ textAlign: 'center', padding: '2rem 0' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>Добро пожаловать на CryptoX</h1>
        <p style={{ marginBottom: '1rem' }}>Торгуйте криптовалютой с минимальными комиссиями и максимальными возможностями.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/trade"><Button>Начать торговать</Button></Link>
          <Link href="/register"><Button variant="secondary">Зарегистрироваться</Button></Link>
        </div>
      </section>
      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>Топ рынков</h2>
        <Card style={{ padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ textAlign: 'left' }}>Пара</th>
                <th>Цена</th>
                <th>24ч %</th>
              </tr>
              </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center' }}>Загрузка...</td>
                </tr>
              )}
              {markets?.map((m, idx) => (  
                <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td>{m.symbol.replace('USDT', '/USDT')}</td>
                  <td style={{ textAlign: 'right' }}>{m.price.toLocaleString()}</td>
                  <td style={{ textAlign: 'right', color: m.change >= 0 ? 'var(--secondary)' : '#e53e3e' }}>{m.change.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>
      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>График BTC/USDT</h2>
        <Card>
          <Chart symbol="BINANCE:BTCUSDT" />
        </Card>
      </section>
    </div>
  );
}