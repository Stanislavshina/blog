import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { User } from '../../types/User';
import { updateUser } from '../../store/slices/userSlice';
import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { username, email, token } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: username,
      email: email,
      password: '',
      image: '',
    },
    mode: 'onChange',
  });

  const usernameError = errors.username ? 'Это поле обязательно для заполнения' : undefined;
  const errorMail = errors.email ? `Wrong email adress` : undefined;
  const errorPasword = errors.password ? 'Пароль от 6 до 40 символов' : undefined;
  const errorImg = errors.image ? 'Введите действительный адрес' : undefined;

  const handleClick: SubmitHandler<User> = (data) => {
    dispatch(updateUser({ data, token }));
    navigate('/');
  };

  return (
    <Form onSubmit={handleSubmit(handleClick)} title={'Edit'} buttonText={'Save'} error={''}>
      <Input
        name={'Username'}
        register={register('username', { required: true })}
        error={usernameError}
        type="text"
        label="Username"
      />
      <Input
        name={'Email'}
        register={register('email', {
          required: true,
          pattern:
            // eslint-disable-next-line no-useless-escape
            /^(?:(?:[^<>()[\]\\.,;:\s@\"]+(?:\.[^<>()[\]\\.,;:\s@\"]+)*)|\".+?\")@(?:(?:(?!-)[a-z0-9\-]{1,63}(?<!-)\.)+[a-z]{2,})$/i,
        })}
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
        type="url"
        name={'image'}
        register={register('image', {
          pattern:
            // eslint-disable-next-line no-useless-escape
            /^https?:\/\/.+/,
        })}
        placeholder="Image"
        label="Avatar"
        error={errorImg}
      />
    </Form>
  );
};

export default EditProfile;
