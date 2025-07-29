import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export function useCoinPrice(symbol: string) {
  const { data, error } = useSWR<{ price: number }>(`/api/price/${symbol}`, fetcher, {
    refreshInterval: 60000,
  });
  return { price: data?.price, isLoading: !data && !error, error };
}