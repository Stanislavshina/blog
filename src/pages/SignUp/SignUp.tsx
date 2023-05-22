import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createNewUser } from '../../store/slices/userSlice';
import { useAppDispatch } from '../../store/storeHooks';
import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';
import cl from './SignUp.module.scss';

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorValue, setErrorValue] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      repeatpassword: '',
      agreeToTerms: false,
    },
    mode: 'onChange',
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
    <Form onSubmit={handleSubmit(onSubmit)} title={'Sign Up'} buttonText={'Sign Up'} link="Sign Up." error={errorValue}>
      <Input
        type="text"
        name={'Username'}
        register={register('username', { minLength: 3, maxLength: 20 })}
        placeholder="Username"
        label="Username"
        error={errorUsername}
      />
      <Input
        name={'Email'}
        register={register('email', {
          required: true,
          // eslint-disable-next-line no-useless-escape
          pattern:
            /^(?:(?:[^<>()[\]\\.,;:\s@\"]+(?:\.[^<>()[\]\\.,;:\s@\"]+)*)|\".+?\")@(?:(?:(?!-)[a-z0-9\-]{1,63}(?<!-)\.)+[a-z]{2,})$/i,
        })}
        placeholder="Email"
        label="Email"
        type="email"
        error={errorMail}
      />
      <Input
        type="password"
        name={'Password'}
        register={register('password', { minLength: 6, maxLength: 40 })}
        placeholder="Password"
        label="Password"
        error={errorPasword}
      />
      <Input
        type="password"
        name={'RepeatPassword'}
        register={register('repeatpassword', { required: true, validate: (value) => value === watch('password') })}
        placeholder="Repeatpassword"
        label="Repeat password"
        error={errorPasswordRepeat}
      />
      <label className={cl['label__check']}>
        <input type="checkbox" {...register('agreeToTerms', { required: true })} className={cl['checkbox']} />I agree to
        the processing of my personal information
      </label>
      {errors.agreeToTerms && <span className={cl['error']}>You must agree to the terms and conditions</span>}
    </Form>
  );
};

export default SignUp;
