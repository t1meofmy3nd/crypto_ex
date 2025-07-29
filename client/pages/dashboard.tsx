import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

interface MarketTicker {
  pair: string;
  price: string;
  change: string;
  up: boolean;
}

interface Tx {
  date: string;
  pair: string;
  type: string;
  price: number;
  amount: number;
}

const DashboardPage = () => {
  const [markets, setMarkets] = useState<MarketTicker[]>([]);
  const [showPortfolio, setShowPortfolio] = useState(true);
  const [showMarkets, setShowMarkets] = useState(true);
  const [showTransactions, setShowTransactions] = useState(true);
  const [showNews, setShowNews] = useState(true);

  const fetchMarkets = async () => {
    const pairs = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XRPUSDT'];
    const results: MarketTicker[] = [];
    for (const symbol of pairs) {
      try {
        const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
        const data = await res.json();
        const price = parseFloat(data.lastPrice);
        const pct = parseFloat(data.priceChangePercent);
        results.push({
          pair: symbol.replace('USDT', '/USDT'),
          price: price.toLocaleString(),
          change: `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`,
          up: pct >= 0
        });
      } catch (err) {
        results.push({ pair: symbol.replace('USDT', '/USDT'), price: '—', change: '—', up: true });
      }
    }
    setMarkets(results);
  };

  useEffect(() => {
    fetchMarkets();
    const stored = localStorage.getItem('dashboardPrefs');
    if (stored) {
      try {
        const p = JSON.parse(stored);
        setShowPortfolio(p.portfolio ?? true);
        setShowMarkets(p.markets ?? true);
        setShowTransactions(p.transactions ?? true);
        setShowNews(p.news ?? true);
      } catch {}
    }
  }, []);

  useEffect(() => {
    const prefs = {
      portfolio: showPortfolio,
      markets: showMarkets,
      transactions: showTransactions,
      news: showNews
    };
    localStorage.setItem('dashboardPrefs', JSON.stringify(prefs));
  }, [showPortfolio, showMarkets, showTransactions, showNews]);

  const transactions: Tx[] = [
    { date: '2025-07-28', pair: 'BTC/USDT', type: 'Buy', price: 65000, amount: 0.01 },
    { date: '2025-07-27', pair: 'ETH/USDT', type: 'Sell', price: 3800, amount: 0.5 }
  ];

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <Card>
        <h2 style={{ marginTop: 0 }}>Настройка виджетов</h2>
        <label style={{ display: 'block' }}>
          <input type="checkbox" checked={showPortfolio} onChange={(e) => setShowPortfolio(e.target.checked)} /> Портфель
        </label>
        <label style={{ display: 'block' }}>
          <input type="checkbox" checked={showMarkets} onChange={(e) => setShowMarkets(e.target.checked)} /> Рынки
        </label>
        <label style={{ display: 'block' }}>
          <input type="checkbox" checked={showTransactions} onChange={(e) => setShowTransactions(e.target.checked)} /> Транзакции
        </label>
        <label style={{ display: 'block' }}>
          <input type="checkbox" checked={showNews} onChange={(e) => setShowNews(e.target.checked)} /> Новости
        </label>
      </Card>
      {showPortfolio && (
      <Card>
        <h2 style={{ marginTop: 0 }}>Баланс портфеля</h2>
        <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>$12,500.00</p>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button>Купить</Button>
          <Button variant="secondary">Продать</Button>
          <Button style={{ backgroundColor: 'var(--border)', color: 'var(--text)' }}>Пополнить/Вывести</Button>
        </div>
      </Card>
      )}
      {showMarkets && (
      <Card>
        <h2 style={{ marginTop: 0 }}>Избранные пары</h2>
        <table style={{ width: '100%', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ textAlign: 'left' }}>Пара</th>
              <th>Цена</th>
              <th>24ч %</th>
            </tr>
          </thead>
          <tbody>
            {markets.map((m, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                <td>{m.pair}</td>
                <td style={{ textAlign: 'right' }}>{m.price}</td>
                <td style={{ textAlign: 'right', color: m.up ? 'var(--secondary)' : '#e53e3e' }}>{m.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      )}
      {showTransactions && (
      <Card>
        <h2 style={{ marginTop: 0 }}>Последние транзакции</h2>
        <table style={{ width: '100%', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ textAlign: 'left' }}>Дата</th>
              <th>Пара</th>
              <th>Тип</th>
              <th>Цена</th>
              <th>Кол-во</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                <td>{t.date}</td>
                <td style={{ textAlign: 'center' }}>{t.pair}</td>
                <td style={{ textAlign: 'center' }}>{t.type}</td>
                <td style={{ textAlign: 'right' }}>{t.price}</td>
                <td style={{ textAlign: 'right' }}>{t.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      )}
      {showNews && (
      <Card>
        <h2 style={{ marginTop: 0 }}>Новости</h2>
        <ul>
          <li>Bitcoin достиг исторического максимума.</li>
          <li>Ethereum готовится к хардфорку.</li>
        </ul>
      </Card>
      )}
    </div>
  );
};

export default DashboardPage;