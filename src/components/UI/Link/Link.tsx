import { ReactNode } from 'react';
import { Form, Primary, Simple } from './LintStyles';

interface LinkProps {
  to: string;
  type: string;
  children: ReactNode;
}

const Link: React.FC<LinkProps> = ({ to, type, children }) => {
  const linkElement =
    type === 'primary' ? (
      <Primary to={to}>{children}</Primary>
    ) : type === 'form' ? (
      <Form to={to}>{children}</Form>
    ) : (
      <Simple to={to}>{children}</Simple>
    );

  return linkElement;
};

export default Link;
