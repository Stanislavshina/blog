import axios, { Method } from 'axios';

const baseUrl = 'https://blog.kata.academy/api';
interface RequestOptions<T> {
  url: string;
  method: Method;
  data?: T;
  token?: string | null | undefined;
  slug?: string;
}

export const sendRequest = async <T>(options: RequestOptions<T>): Promise<T> => {
  try {
    const { url, method, data, token } = options;
    const response = await axios({
      method,
      url: `${baseUrl}${url}`,
      data,
      headers: token ? { Authorization: `Token ${token}` } : {},
    });
    return response.data as T;
  } catch (error) {
    throw new Error('nope');
  }
};
