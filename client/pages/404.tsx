import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
      <p style={{ marginBottom: '1rem' }}>Упс! Страница не найдена.</p>
      <Link href="/" style={{ color: '#2b6cb0', textDecoration: 'underline' }}>
        Вернуться на главную
      </Link>
    </div>
  );
}