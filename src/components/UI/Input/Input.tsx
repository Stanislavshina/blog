
import {  InputField, Span } from './InputStyled';


interface InputProps {
  error?: string;
  name: string;
  register: any;
  label?: string;
  placeholder?: string;
  type?: 'textarea' | 'text' | 'password' | 'email';
}



const Input: React.FC<InputProps> = ({error, label, name, placeholder, type,register}) => {


  
  return (
    <div>
      <label >
      {label && <span>{label}</span>}
      {type === 'textarea' ?  (
        <textarea
          placeholder={placeholder || label || ''}
          {...register}
        >
        </textarea>
      ) : (
        <InputField
        name={name}
        className={error ? 'error' : ''}
        type={type}
        placeholder={placeholder || label || ''}
        {...register}/>
      )}
    </label>
    {error && <Span>{error}</Span>}
    </div>
  );
};

export default Input;
