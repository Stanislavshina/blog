import { ArticleTypes } from '../../types/ArticleTypes';
import { sendRequest } from '../request';

export const setFavorited = async (slug: Pick<ArticleTypes, 'slug'>, token: string): Promise<void> => {
  try {
    await sendRequest({
      method: 'post',
      url: `/articles/${slug}/favorite`,
      token: token,
    });
  } catch (error) {
    throw new Error('error');
  }
};

export const deleteFavorited = async (slug: Pick<ArticleTypes, 'slug'>, token: string): Promise<void> => {
  try {
    await sendRequest({
      method: 'delete',
      url: `/articles/${slug}/favorite`,
      token: token,
    });
  } catch (error) {
    throw new Error('error');
  }
};
