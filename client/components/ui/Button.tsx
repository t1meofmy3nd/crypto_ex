import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
}

const Button = ({ variant = 'primary', children, style, ...props }: Props) => {
  const baseStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    borderRadius: 4,
    border: 'none',
    cursor: 'pointer',
    backgroundColor: variant === 'primary' ? 'var(--primary)' : 'var(--secondary)',
    color: '#fff'
  };
  return (
    <button {...props} style={{ ...baseStyle, ...(style || {}) }}>{children}</button>
  );
};

export default Button;