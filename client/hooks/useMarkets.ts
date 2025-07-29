import useSWR from 'swr';
import { apiFetch } from '../services/api';

export interface Market {
  symbol: string;
  price: number;
  change: number;
}

export function useMarkets() {
  const { data, error } = useSWR<Market[]>('/api/markets', (url) => apiFetch(url), {
    refreshInterval: 60000,
  });
  return {
    markets: data,
    isLoading: !error && !data,
    error,
  };
}