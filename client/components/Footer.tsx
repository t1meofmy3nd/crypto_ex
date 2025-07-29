 font-size: 0.9rem;
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(150px,1fr));
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const ColumnTitle = styled.h4`
  margin: 0 0 0.5rem;
  color: var(--primary);
  font-size: 1rem;
`;

const Bottom = styled.div`
  text-align: center;
  margin-top: 1rem;
  border-top: 1px solid var(--border);
  padding-top: 1rem;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <div className="container">
        <Columns>
          <div>
            <ColumnTitle>О нас</ColumnTitle>
            <ul>
              <li><a href="#">Команда</a></li>
              <li><a href="#">Вакансии</a></li>
              <li><a href="#">Контакты</a></li>
            </ul>
          </div>
          <div>
            <ColumnTitle>Продукты</ColumnTitle>
            <ul>
              <li><a href="#">Спот</a></li>
              <li><a href="#">Фьючерсы</a></li>
              <li><a href="#">Кошелек</a></li>
            </ul>
          </div>
          <div>
            <ColumnTitle>Для компаний</ColumnTitle>
            <ul>
              <li><a href="#">API</a></li>
              <li><a href="#">Маркет-мейкинг</a></li>
              <li><a href="#">Партнерская программа</a></li>
            </ul>
          </div>
          <div>
            <ColumnTitle>Сообщество</ColumnTitle>
            <ul>
              <li><a href="#">Блог</a></li>
              <li><a href="#">Телеграм</a></li>
              <li><a href="#">Твиттер</a></li>
            </ul>
          </div>
        </Columns>
        <Bottom>© 2025 CryptoX</Bottom>
      </div>
    </FooterWrapper>
  );
}