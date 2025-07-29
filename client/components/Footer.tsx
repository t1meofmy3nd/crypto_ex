import styled from "styled-components";

/**
 * Footer component renders the application footer. It uses styled-components
 * for styling rather than inline CSS. The previous implementation had
 * incomplete CSS declarations at the top of the file (e.g. `font-size: 0.9rem;`)
 * which caused the TypeScript compiler to error because it was not attached
 * to any styled component. We define a FooterWrapper here along with other
 * layout components to properly scope styling.
 */

// Wrapper element for the footer area. Uses a secondary background and padding.
const FooterWrapper = styled.footer`
  padding: 2rem 0;
  background: var(--background-secondary);
  color: var(--text);
  font-size: 0.9rem;
`;

// Grid container to layout footer columns responsively.
const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

// Title for each column, emphasised with primary colour.
const ColumnTitle = styled.h4`
  margin: 0 0 0.5rem;
  color: var(--primary);
  font-size: 1rem;
`;

// Bottom line section of the footer with a border and centred text.
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