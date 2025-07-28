const WalletPage = () => {
  const balances = [
    { coin: 'BTC', total: 0.12, available: 0.12 },
    { coin: 'ETH', total: 2.5, available: 2.3 },
    { coin: 'USDT', total: 3500, available: 3500 }
  ];
  return (
    <div>
      <h1 style={{ marginBottom: '1rem' }}>Кошелек</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
            <th style={{ textAlign: 'left' }}>Монета</th>
            <th>Баланс</th>
            <th>Доступно</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {balances.map((b, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td>{b.coin}</td>
              <td style={{ textAlign: 'right' }}>{b.total}</td>
              <td style={{ textAlign: 'right' }}>{b.available}</td>
              <td style={{ textAlign: 'right' }}>
                <button style={{ marginRight: '0.5rem', padding: '0.25rem 0.5rem', border: '1px solid #cbd5e0', borderRadius: 4, cursor: 'pointer' }}>Пополнить</button>
                <button style={{ padding: '0.25rem 0.5rem', border: '1px solid #cbd5e0', borderRadius: 4, cursor: 'pointer' }}>Вывести</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WalletPage;