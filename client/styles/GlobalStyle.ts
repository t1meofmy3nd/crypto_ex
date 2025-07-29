import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --bg-color: ${({ theme }) => theme.colors.background};
    --text-color: ${({ theme }) => theme.colors.text};
    --accent-color: ${({ theme }) => theme.colors.accent};
    --button-bg: var(--accent-color);
    --button-text: ${({ theme }) => theme.colors.buttonText};
    --card-bg: ${({ theme }) => theme.colors.cardBg};
    --input-bg: ${({ theme }) => theme.colors.cardBg};
    --border-color: ${({ theme }) => theme.colors.border};
    --background-secondary: ${({ theme }) => theme.colors.cardBg};
  }
`;