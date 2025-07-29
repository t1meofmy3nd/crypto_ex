import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --bg-color: ${({ theme }) => theme.colors.background};
    --text-color: ${({ theme }) => theme.colors.text};
    --accent-color: ${({ theme }) => theme.colors.accent};
    --button-bg: #1E5DF3;
    --button-text: #ffffff;
    --card-bg: ${({ theme }) => theme.colors.cardBg};
    --input-bg: ${({ theme }) => theme.colors.cardBg};
    --border-color: ${({ theme }) => theme.colors.border};
    --background-secondary: ${({ theme }) => theme.colors.cardBg};
  }
`;