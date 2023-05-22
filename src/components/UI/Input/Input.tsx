import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';
import { ArticleInput, InputField, Span, TextArea } from './InputStyled';

interface InputProps {
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  name: string;
  register: any;
  label?: string;
  placeholder?: string;
  type?: 'textarea' | 'text' | 'password' | 'email' | 'url';
}

const Input: React.FC<InputProps> = ({ error, label, name, placeholder, type, register }) => {
  const errorVal = error ? `${error}` : undefined;
  return (
    <div>
      <label>
        {label && <span>{label}</span>}
        {type === 'textarea' ? (
          <TextArea placeholder={placeholder || label || ''} {...register}></TextArea>
        ) : name === 'articleInput' ? (
          <ArticleInput
            className={error ? 'error' : ''}
            type={type}
            placeholder={placeholder || label || ''}
            {...register}
          />
        ) : (
          <InputField
            name={name}
            className={error ? 'error' : ''}
            type={type}
            placeholder={placeholder || label || ''}
            {...register}
          />
        )}
      </label>
      {error && <Span>{errorVal}</Span>}
    </div>
  );
};

export default Input;
