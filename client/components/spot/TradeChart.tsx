import Chart from '../Chart';

interface Props {
  symbol: string;
}

const TradeChart = ({ symbol }: Props) => (
  <Chart symbol={`BINANCE:${symbol}`} />
);

export default TradeChart;