import { HTMLAttributes, useEffect, useState } from 'react';

interface ChartProps extends HTMLAttributes<HTMLDivElement> {
  symbol: string;
}

const Chart = ({ symbol, className, style, ...rest }: ChartProps) => {
  const [iframeKey, setIframeKey] = useState(Date.now());

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
  }, [symbol]);

  const theme = getTheme();
  const src = `https://s.tradingview.com/widgetembed/?symbol=${symbol}&interval=60&symboledit=1&saveimage=0&toolbarbg=F1F3F6&hideideas=1&theme=${theme}&style=1&timezone=Etc/UTC&withdateranges=1&studies=%5B%5D&hide_side_toolbar=0&allow_symbol_change=1&details=0&hotlist=0&calendar=0`;

  return (
    <div
      className={className}
      style={{ width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.5)', ...style }}
      {...rest}
    >
      <iframe
        key={iframeKey}
        title={`TradingView Chart ${symbol}`}
        src={src}
        style={{ width: '100%', height: '100%', border: 'none' }}
        allowFullScreen
      />
    </div>
  );
};

export default Chart;