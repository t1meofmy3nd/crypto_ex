import { useState } from 'react';
import { useRouter } from 'next/router';
import { apiFetch } from '../services/api';
import Button from '../components/ui/Button';

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
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
    try {
      await apiFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      router.push('/login');
    } catch (err: any) {
      setError(err.message || 'Ошибка регистрации');
    }
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
        <Button type="submit">Зарегистрироваться</Button>
      </form>
    </div>
  );
};

export default RegisterPage;