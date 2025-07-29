import Link from 'next/link';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Chart from '../components/Chart';
import { useMarkets } from '../hooks/useMarkets';

export default function Home() {
  const { markets, isLoading } = useMarkets();

  return (
    <div>
      <section className="hero">
        <div>
          <h1 className="slogan">Покупайте крипту с минимальными комиссиями на CryptoX</h1>
          <div className="input-row">
            <input className="text-input" placeholder="Эл. почта или номер телефона" />
            <Button>Начать</Button>
          </div>
          <div className="icon-buttons">
            <Button style={{ padding: '0.25rem 0.5rem' }}>G</Button>
            <Button style={{ padding: '0.25rem 0.5rem' }}></Button>
          </div>
        </div>
        <div className="markets-wrapper">
          <Card style={{ padding: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
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
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td>{m.symbol.replace('USDT', '/USDT')}</td>
                    <td style={{ textAlign: 'right' }}>{m.price.toLocaleString()}</td>
                    <td style={{ textAlign: 'right', color: m.change >= 0 ? 'var(--secondary-color)' : '#e53e3e' }}>{m.change.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <Card>
            <h3 style={{ marginTop: 0 }}>Новости</h3>
            <ul>
              <li>Новая версия платформы CryptoX</li>
              <li>Bitcoin достиг исторического максимума</li>
            </ul>
          </Card>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>Мобильное приложение</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <img src="/assets/logo.svg" alt="app" style={{ width: 150 }} />
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button>iOS</Button>
            <Button variant="secondary">Android</Button>
            <Button variant="secondary">Windows</Button>
            <Button variant="secondary">macOS</Button>
          </div>
        </div>
      </section>
      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>Часто задаваемые вопросы</h2>
        <Card>
          <details>
            <summary>Что такое криптовалютная биржа?</summary>
            <p>Площадка для покупки и продажи цифровых активов.</p>
          </details>
          <details>
            <summary>Как торговать на CryptoX?</summary>
            <p>Создайте аккаунт, пополните баланс и выберите торговую пару.</p>
          </details>
          <details>
            <summary>Как пополнить и вывести средства?</summary>
            <p>Перейдите в раздел "Кошелек" и следуйте инструкциям.</p>
          </details>
        </Card>
      </section>

      <section style={{ marginTop: '2rem', textAlign: 'center' }}>
        <h2>Начните зарабатывать сегодня</h2>
        <Link href="/register"><Button style={{ fontSize: '1.25rem', padding: '0.75rem 2rem' }}>Зарегистрироваться</Button></Link>
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