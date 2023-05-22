import { ArticleInput, InputField, Span, TextArea } from './InputStyled';

interface InputProps {
  error?: string;
  name: string;
  register: any;
  label?: string;
  placeholder?: string;
  type?: 'textarea' | 'text' | 'password' | 'email' | 'url';
}

const Input: React.FC<InputProps> = ({ error, label, name, placeholder, type, register }) => {
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
      {error && <Span>{error}</Span>}
    </div>
  );
};

export default Input;
