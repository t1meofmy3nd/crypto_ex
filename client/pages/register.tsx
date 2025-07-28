import { useState } from 'react';
import { useRouter } from 'next/router';

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password || !confirmPassword) {
      setError('Заполните все поля');
      return;
    }
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    // Mock registration success
    router.push('/login');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1rem' }}>Регистрация</h1>
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
        <label>
          Повторите пароль
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e0', borderRadius: 4 }} />
        </label>
        <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#38a169', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegisterPage;