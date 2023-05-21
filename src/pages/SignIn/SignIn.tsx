import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/slices/userSlice';
import { User } from '../../types/User';
import { AnyAction, PayloadAction, unwrapResult } from '@reduxjs/toolkit';
import { useState } from 'react';

type Data = {
  email: string;
  password: string
}

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const {errorMessage} = useAppSelector(state=> state.user)
  const navigate = useNavigate();
  const [errorValue, setErrorValue] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  
  const errorMail = errors.email ? `Wrong email` : '';
  

  const onSubmit: SubmitHandler<Data> = async (data) => {
    await dispatch(login(data) as any).then((response: AnyAction) => response.payload ? navigate('/') : setErrorValue(errorMessage));
  };
  

  return (
    <Form onSubmit={handleSubmit(onSubmit)} title={'Sign Up'} buttonText={'Login'} error={errorValue} link='Sign Up.'>
      <Input name={'email'} register={register("email", { required: true, pattern:     // eslint-disable-next-line no-useless-escape
    /^(?:(?:[^<>()[\]\\.,;:\s@\"]+(?:\.[^<>()[\]\\.,;:\s@\"]+)*)|\".+?\")@(?:(?:(?!-)[a-z0-9\-]{1,63}(?<!-)\.)+[a-z]{2,})$/i })} label='Email' type='email' placeholder='Email adress' error={errorMail}/>
      <Input name={'password'} register={register("password", { required: true})} placeholder='Password'/>
    </Form>
  );
};

export default SignIn;
