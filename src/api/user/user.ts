import { User } from '../../types/User';
import { sendRequest } from '../request';
import Cookies from 'js-cookie';

interface UserResponse {
  user: User;
}

type Data = {
  email: string;
  password: string;
};

export const getLogin = async (data: Data): Promise<UserResponse> => {
  try {
    const { email, password } = data;
    const res = (await sendRequest({
      url: '/users/login',
      method: 'post',
      data: {
        user: { email, password },
      },
    })) as UserResponse;
    return res;
  } catch (error) {
    throw new Error('nope');
  }
};

export const checkAndLogToken = async () => {
  const token = Cookies.get('token');
  const password = Cookies.get('password');
  if (!token) return;
  try {
    const res = (await sendRequest({
      url: '/user',
      method: 'get',
      token,
    })) as UserResponse;
    return { ...res.user, password };
  } catch (error) {
    console.log(error);
  }
};

export const setNewUser = async (data: User): Promise<UserResponse> => {
  try {
    const { email, password, username } = data;
    const res = (await sendRequest({
      url: '/users/',
      method: 'post',
      data: {
        user: { username, email, password },
      },
    })) as UserResponse;

    if (res.user && res.user.token) {
      Cookies.set('token', res.user.token, { expires: 7, secure: true });
      Cookies.set('password', password, { expires: 7, secure: true });
    }

    return res;
  } catch (error) {
    throw new Error('nope');
  }
};

export const UpdateUserInfo = async ({
  data,
  token,
}: {
  data: User;
  token: string | undefined | null;
}): Promise<UserResponse> => {
  try {
    const { email, password, username, image } = data;
    const res = (await sendRequest({
      url: '/user',
      method: 'put',
      data: {
        user: { username, email, password: password ? password : undefined, image },
      },
      token,
    })) as UserResponse;
    Cookies.set('password', password, { secure: true, expires: 7 });
    return res;
  } catch (error) {
    throw new Error('nope');
  }
};
