import { sendRequest } from '../request';

export const setFavorited = async (slug: string, token: string | null | undefined) => {
  try {
    const res = await sendRequest({
      method: 'post',
      url: `/articles/${slug}/favorite`,
      token: token,
    });
    console.log(res);

    return res;
  } catch (error) {
    throw new Error('error');
  }
};

export const deleteFavorited = async (slug: string, token: string | null | undefined) => {
  try {
    const res = await sendRequest({
      method: 'delete',
      url: `/articles/${slug}/favorite`,
      token: token,
    });
    console.log(res);
    return res;
  } catch (error) {
    throw new Error('error');
  }
};
