import useSWR from 'swr';
import { apiFetch } from '../services/api';

export function useCoinPrice(id: string) {
  const { data, error } = useSWR(`/api/coin/${id}`, (url) => apiFetch(url), {
    refreshInterval: 60000,
  });
  return { price: data?.usd as number | undefined, isLoading: !data && !error };
}