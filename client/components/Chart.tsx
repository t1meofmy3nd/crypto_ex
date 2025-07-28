import { useEffect, useState } from 'react';

interface ChartProps {
  symbol: string;
}

const Chart = ({ symbol }: ChartProps) => {
  const [iframeKey, setIframeKey] = useState(Date.now());

  useEffect(() => {
    // Force re-render iframe when symbol changes by changing key
    setIframeKey(Date.now());
  }, [symbol]);

  // TradingView embed URL for symbol overview
  const src = `https://s.tradingview.com/widgetembed/?symbol=${symbol}&interval=60&symboledit=1&saveimage=0&toolbarbg=F1F3F6&hideideas=1&theme=light&style=1&timezone=Etc/UTC&withdateranges=1&studies=%5B%5D&hide_side_toolbar=0&allow_symbol_change=1&details=0&hotlist=0&calendar=0`; // customizing options

  return (
    <div style={{ width: '100%', height: '400px' }}>
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