import { useState } from 'react';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Mock authentication
    if (email && password) {
      // Save fake token
      localStorage.setItem('token', 'mock-jwt-token');
      router.push('/');
    } else {
      setError('Введите email и пароль');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1rem' }}>Вход</h1>
      {error && <p style={{ color: '#e53e3e' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e0', borderRadius: 4 }} />
        </label>
        <label>
          Пароль
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e0', borderRadius: 4 }} />
        </label>
        <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#2b6cb0', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Войти</button>
      </form>
    </div>
  );
};

export default LoginPage;