import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
}

const Button = ({ variant = 'primary', children, className, style, ...props }: Props) => {
  const classes = ['btn'];
  if (variant === 'secondary') classes.push('secondary');
  if (className) classes.push(className);
  return (
    <button {...props} className={classes.join(' ')} style={style}>{children}</button>
  );
};

export default Button;