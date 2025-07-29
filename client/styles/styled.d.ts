import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      text: string;
      heading: string;
      accent: string;
      background: string;
      cardBg: string;
      border: string;
      buttonText: string;
      newsBg: string;
    };
  }
}