import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  headers: { 'Content-Type': 'application/json' },
});

export async function apiFetch<T = any>(url: string, options: { method?: string; body?: any; headers?: any } = {}): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const res = await api.request<T>({
    url,
    method: options.method || (options.body ? 'post' : 'get'),
    data: options.body ? JSON.parse(options.body) : undefined,
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) },
  });
  return res.data;
}

export default api;