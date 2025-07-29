import { useEffect, useState } from 'react';
import { apiFetch } from '../services/api';
import Layout from '../components/Layout';

interface Stats {
  users: number;
  orders: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  useEffect(() => {
    apiFetch<Stats>('/api/admin/stats').then(setStats).catch(() => {});
  }, []);

  return (
    <Layout>
      <h1>Админ-панель</h1>
      {stats ? (
        <pre>{JSON.stringify(stats, null, 2)}</pre>
      ) : (
        <p>Загрузка...</p>
      )}
    </Layout>
  );
}