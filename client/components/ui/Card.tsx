import { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Card = ({ children, className, style, ...rest }: Props) => (
  <div className={`card ${className ?? ''}`} style={style} {...rest}>
    {children}
  </div>
);

export default Card;