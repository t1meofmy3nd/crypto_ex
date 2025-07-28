import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    // Check local storage for theme preference
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') setDark(true);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <>
      <Head>
        <title>CryptoX</title>
        <meta name="description" content="Modern crypto exchange platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', padding: '0.5rem 1rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 600, fontSize: '1.2rem', color: '#2b6cb0' }}>CryptoX</div>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/">Главная</Link>
            <Link href="/trade">Спот</Link>
            <Link href="/futures">Фьючерсы</Link>
            <Link href="/wallet">Кошелек</Link>
            <Link href="/account">Кабинет</Link>
          </nav>
          <button onClick={() => setDark(!dark)} style={{ padding: '0.5rem 0.75rem', borderRadius: 4, border: '1px solid #cbd5e0', cursor: 'pointer' }}>
            {dark ? 'Светлая тема' : 'Тёмная тема'}
          </button>
        </div>
      </header>
      <main className="container" style={{ minHeight: 'calc(100vh - 140px)', paddingTop: '1rem' }}>
        {children}
      </main>
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '0.5rem 1rem', textAlign: 'center' }}>
        © 2025 CryptoX. Все права защищены.
      </footer>
    </>
  );
};

export default Layout;