import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Button from './ui/Button';
import Footer from './Footer';

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
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    window.dispatchEvent(new Event('theme-change'))
  }, [dark]);

  return (
    <>
      <Head>
        <title>CryptoX</title>
        <meta name="description" content="Modern crypto exchange platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header style={{ backgroundColor: 'var(--card-bg)', borderBottom: '1px solid var(--border-color)', padding: '0.5rem 1rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 600, fontSize: '1.2rem', color: 'var(--primary-color)' }}>CryptoX</div>
          <nav style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/">Главная</Link>
            <Link href="/dashboard">Дашборд</Link>
            <Link href="/trade">Спот</Link>
            <Link href="/futures">Фьючерсы</Link>
            <Link href="/wallet">Кошелек</Link>
            <Link href="/account">Кабинет</Link>
          </nav>
          <Button onClick={() => setDark(!dark)} style={{ border: '1px solid var(--border-color)' }}>
            {dark ? 'Светлая тема' : 'Тёмная тема'}
          </Button>
        </div>
      </header>
      <main className="container" style={{ minHeight: 'calc(100vh - 140px)', paddingTop: '1rem' }}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;