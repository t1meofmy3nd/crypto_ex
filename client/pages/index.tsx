import { useEffect, useState } from 'react';
import Link from 'next/link';
import Chart from '../components/Chart';

interface MarketTicker {
  pair: string;
  price: string;
  change: string;
  up: boolean;
}

export default function Home() {
  const [markets, setMarkets] = useState<MarketTicker[]>([]);

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
    const interval = setInterval(fetchMarkets, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <section style={{ textAlign: 'center', padding: '2rem 0' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#2b6cb0' }}>Добро пожаловать на CryptoX</h1>
        <p style={{ marginBottom: '1rem' }}>Торгуйте криптовалютой с минимальными комиссиями и максимальными возможностями.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Link href="/trade"><button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#38a169', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Начать торговать</button></Link>
          <Link href="/register"><button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2b6cb0', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Зарегистрироваться</button></Link>
        </div>
      </section>
      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>Топ рынков</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left' }}>Пара</th>
              <th>Цена</th>
              <th>24ч %</th>
            </tr>
          </thead>
          <tbody>
            {markets.map((m, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td>{m.pair}</td>
                <td style={{ textAlign: 'right' }}>{m.price}</td>
                <td style={{ textAlign: 'right', color: m.up ? '#38a169' : '#e53e3e' }}>{m.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>График BTC/USDT</h2>
        <Chart symbol="BINANCE:BTCUSDT" />
      </section>
    </div>
  );
}