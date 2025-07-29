import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  style?: React.CSSProperties;
}

const Card = ({ children, style }: Props) => (
  <div className="card" style={style}>{children}</div>
);

export default Card;