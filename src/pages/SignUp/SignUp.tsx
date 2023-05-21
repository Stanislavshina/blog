import { AnyAction, unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createNewUser, login } from '../../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { User } from '../../types/User';
import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';



const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const {errorMessage} = useAppSelector(state=> state.user)
  const navigate = useNavigate();
  const [errorValue, setErrorValue] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatpassword: "",
      agreeToTerms: false,
    },
    mode: "onChange",
  });
  
  const errorMail = errors.email ? `Wrong email adress` : '';
  const errorPasswordRepeat = errors.repeatpassword ? 'Пароли должны совпадать' : undefined;
  const errorPasword = errors.password ? 'Пароль от 6 до 40 символов' : undefined;
  const errorUsername = errors.username ? 'Имя от 3 до 20 символов' : undefined;


  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      const actionResult = await dispatch(createNewUser(data));
      const result = unwrapResult(actionResult);
  
      if (result) {
        navigate('/');
      }
    } catch (error) {
      setErrorValue('Введите другие данные');
    }
  };
  

  return (
    <Form onSubmit={handleSubmit(onSubmit)} title={'Sign Up'}  buttonText={'Sign Up'} link='Sign Up.' error={errorValue}>
      <Input type='text' name={'Username'} register={register('username', {minLength: 3, maxLength: 20})} placeholder='Username'label='Username' error={errorUsername} />
      <Input name={'Email'} register={register("email", { required: true, pattern:     // eslint-disable-next-line no-useless-escape
    /^(?:(?:[^<>()[\]\\.,;:\s@\"]+(?:\.[^<>()[\]\\.,;:\s@\"]+)*)|\".+?\")@(?:(?:(?!-)[a-z0-9\-]{1,63}(?<!-)\.)+[a-z]{2,})$/i })} placeholder='Email'label='Email' type='email' error={errorMail}/>
      <Input type='password' name={'Password'} register={register('password', {minLength: 6, maxLength: 40})} placeholder='Password'label='Password' error={errorPasword}/>
      <Input type='password' name={'RepeatPassword'} register={register('repeatpassword', {required: true, validate: (value)=> value === watch('password')})} placeholder='Repeatpassword'label='Repeat password' error={errorPasswordRepeat}/>
    </Form>
  );
};

export default SignUp;


