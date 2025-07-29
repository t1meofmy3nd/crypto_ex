import Card from '../components/ui/Card';
import AuthGuard from '../components/AuthGuard';

const AccountPage = () => {
  const user = { name: 'Satoshi Nakamoto', email: 'satoshi@example.com', verified: true };
  const history = [
    { date: '2025-07-28 10:23', pair: 'BTC/USDT', type: 'Покупка', price: 65000, amount: 0.01 },
    { date: '2025-07-27 18:45', pair: 'ETH/USDT', type: 'Продажа', price: 3800, amount: 0.5 }
  ];
  return (
    <div>
      <h1 style={{ marginBottom: '1rem' }}>Личный кабинет</h1>
      <Card style={{ marginBottom: '1rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Информация о пользователе</h2>
        <p><strong>Имя:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Верификация:</strong> {user.verified ? 'Пройдена' : 'Не пройдена'}</p>
      </Card>
      <Card>
        <h2 style={{ marginTop: 0, marginBottom: '0.5rem' }}>История сделок</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left' }}>Дата</th>
              <th>Пара</th>
              <th>Тип</th>
              <th>Цена</th>
              <th>Кол-во</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td>{h.date}</td>
                <td style={{ textAlign: 'center' }}>{h.pair}</td>
                <td style={{ textAlign: 'center' }}>{h.type}</td>
                <td style={{ textAlign: 'right' }}>{h.price}</td>
                <td style={{ textAlign: 'right' }}>{h.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default function AccountGuardPage() {
  return (
    <AuthGuard>
      <AccountPage />
    </AuthGuard>
  );
}