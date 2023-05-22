import { ReactNode } from 'react';
import cl from './Form.module.scss';
import Link from '../Link/Link';
import Button from '../Button/Button';

interface FormProps {
  onSubmit: () => void;
  title: string;
  children: ReactNode;
  buttonText: string;
  link?: string;
  error: string;
  typeButton?: string;
}

const Form: React.FC<FormProps> = ({ onSubmit, children, title, buttonText, link, error, typeButton = 'form' }) => {
  const footerLink =
    link === 'Sign In.' ? (
      <p style={{ color: '#8C8C8C', display: 'flex', gap: '3px' }}>
        Don’t have an account?
        <Link children={link} to={'/sign-up'} type={'form'} />
      </p>
    ) : (
      <p style={{ color: '#8C8C8C', display: 'flex', gap: '3px' }}>
        Already have an account?
        <Link children={'Sign In.'} to={'/sign-in'} type={'form'} />
      </p>
    );
  return (
    <form onSubmit={onSubmit} className={cl['form']}>
      <h1 className={cl['form__title']}>{title}</h1>
      <fieldset className={cl['form__field']}>{children}</fieldset>
      {error && <span style={{ fontSize: '12px', color: '#F5222D' }}>{error}</span>}
      <Button typeButton={typeButton} linkType={'simple'}>
        {buttonText}
      </Button>
      {link && footerLink}
    </form>
  );
};

export default Form;
