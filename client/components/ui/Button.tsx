import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
}

const Button = ({ variant = 'primary', children, className, style, ...props }: Props) => {
  const classes = ['btn'];
  if (variant === 'primary') {
    classes.push(
      'bg-blue-600',
      'text-white',
      'hover:bg-blue-700',
      'dark:bg-blue-600',
      'dark:hover:bg-blue-700'
    );
  } else {
    classes.push('secondary');
  }
  if (className) classes.push(className);
  return (
    <button {...props} className={classes.join(' ')} style={style}>{children}</button>
  );
};

export default Button;