import { ReactNode } from 'react';
import Link from '../Link/Link';
import {
  AddTag,
  ArticleForm,
  Bordered,
  DelTag,
  Delete,
  Edete,
  Form,
  NewArticle,
  Primary,
  Simple,
} from './ButtonStyles';

interface ButtonProps {
  typeButton: string;
  to?: string;
  children: ReactNode | string;
  linkType: string;
  onSubmit?: () => void;
}

const Button: React.FC<ButtonProps> = ({ typeButton, to = '', children, linkType, onSubmit }) => {
  const buttonElement =
    typeButton === 'primary' ? (
      <Link to={to} type={linkType}>
        <Primary>{children}</Primary>
      </Link>
    ) : typeButton === 'form' ? (
      <Form type="submit">{children}</Form>
    ) : typeButton === 'simple' ? (
      <Link to={to} type={linkType}>
        <Simple>{children}</Simple>
      </Link>
    ) : typeButton === 'new article' ? (
      <Link to={to} type={linkType}>
        <NewArticle>{children}</NewArticle>
      </Link>
    ) : typeButton === 'bordered' ? (
      <Bordered onClick={onSubmit}>{children}</Bordered>
    ) : typeButton === 'delete' ? (
      <Delete>Delete</Delete>
    ) : typeButton === 'deleteTag' ? (
      <DelTag onClick={onSubmit}>Delete</DelTag>
    ) : typeButton === 'addTag' ? (
      <AddTag onClick={onSubmit}>Add tag</AddTag>
    ) : typeButton === 'articleForm' ? (
      <ArticleForm type="submit" children={children} />
    ) : (
      <Link to={to} type={'simple'}>
        <Edete onClick={onSubmit}>Edete</Edete>
      </Link>
    );

  return buttonElement;
};

export default Button;
