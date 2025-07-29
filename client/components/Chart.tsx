import { HTMLAttributes, useEffect, useState } from 'react';
import { useMarkets } from '../hooks/useMarkets';

interface ChartProps extends HTMLAttributes<HTMLDivElement> {
  symbol: string;
}

const Chart = ({ symbol, className, style, ...rest }: ChartProps) => {
  const [iframeKey, setIframeKey] = useState(Date.now());
  const [interval, setInterval] = useState('60');
  const { markets } = useMarkets();
  const market = markets?.find(m => m.symbol === symbol.replace('BINANCE:',''));

  const getTheme = () => {
    if (typeof document === 'undefined') return 'light';
    const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim();
    return bg === '#181A20' ? 'dark' : 'light';
  };

  useEffect(() => {
    // Force re-render iframe when symbol or theme changes
    const handle = () => setIframeKey(Date.now());
    window.addEventListener('theme-change', handle);
    return () => window.removeEventListener('theme-change', handle);
  }, []);

  useEffect(() => {
    setIframeKey(Date.now());
  }, [symbol, interval]);

  const theme = getTheme();
  const src = `https://s.tradingview.com/widgetembed/?symbol=${symbol}&interval=${interval}&symboledit=1&saveimage=0&toolbarbg=F1F3F6&hideideas=1&theme=${theme}&style=1&timezone=Etc/UTC&withdateranges=1&studies=%5B%5D&hide_side_toolbar=0&allow_symbol_change=1&details=0&hotlist=0&calendar=0`;

  return (
    <div className={className} {...rest} style={{ ...style }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <div style={{ fontWeight: 600 }}>
          {symbol.replace('BINANCE:', '').replace('USDT','/USDT')}
          {market && (
            <span style={{ marginLeft: '0.5rem', fontWeight: 400 }}>
              {market.price.toLocaleString()} ({market.change.toFixed(2)}%)
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          {[
            { l: '1м', v: '1' },
            { l: '5м', v: '5' },
            { l: '15м', v: '15' },
            { l: '1ч', v: '60' },
            { l: '4ч', v: '240' },
            { l: '1д', v: 'D' },
          ].map(t => (
            <button
              key={t.v}
              onClick={() => setInterval(t.v)}
              style={{
                padding: '0.25rem 0.5rem',
                fontSize: '0.8rem',
                background: interval === t.v ? 'var(--accent-color)' : 'var(--card-bg)',
                color: interval === t.v ? '#fff' : 'var(--text-color)',
                border: '1px solid var(--border-color)',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              {t.l}
            </button>
          ))}
        </div>
      </div>
      <div style={{ width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
        <iframe
          key={iframeKey}
          title={`TradingView Chart ${symbol}`}
          src={src}
          style={{ width: '100%', height: '100%', border: 'none' }}
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Chart;