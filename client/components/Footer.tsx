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
  text-align: left;
`;

// Title for each column, emphasised with primary colour.
const ColumnTitle = styled.h4`
  margin: 0 0 0.5rem;
  color: #1E5DF3;
  font-size: 1rem;
`;

const Socials = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const StyledLink = styled.a`
  color: #B7BDC6;
  text-decoration: none;
  &:hover { color: #fff; }
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
      <div className="container text-black dark:text-white">
        <Columns>
          <div>
            <ColumnTitle>О нас</ColumnTitle>
            <ul>
              <li><StyledLink href="#">Команда</StyledLink></li>
              <li><StyledLink href="#">Вакансии</StyledLink></li>
              <li><StyledLink href="#">Контакты</StyledLink></li>
            </ul>
          </div>
          <div>
            <ColumnTitle>Продукты</ColumnTitle>
            <ul>
              <li><StyledLink href="#">Спот</StyledLink></li>
              <li><StyledLink href="#">Фьючерсы</StyledLink></li>
              <li><StyledLink href="#">Кошелек</StyledLink></li>
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
              <li><StyledLink href="#">Блог</StyledLink></li>
              <li><StyledLink href="#">Телеграм</StyledLink></li>
              <li><StyledLink href="#">Твиттер</StyledLink></li>
            </ul>
          </div>
          <Socials>
              <a href="#"><img src="/assets/telegram.svg" alt="Telegram" width="24" height="24"/></a>
              <a href="#"><img src="/assets/twitter.svg" alt="Twitter" width="24" height="24"/></a>
              <a href="#"><img src="/assets/discord.svg" alt="Discord" width="24" height="24"/></a>
            </Socials>
        </Columns>
        <Bottom>© 2025 CryptoX</Bottom>
      </div>
    </FooterWrapper>
  );
}