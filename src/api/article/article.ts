import { sendRequest } from '../request';
import { FormState } from '../../types/Form';
import { ArticleTypes } from '../../types/ArticleTypes';

interface ArticlesResponse {
  articles: ArticleTypes[];
  articlesCount: number;
}

export const getArticle = async (slug: Pick<ArticleTypes, 'slug'>, token: string): Promise<ArticlesResponse> => {
  try {
    const res = (await sendRequest({
      method: 'get',
      url: `/articles/${slug}`,
      token: token,
    })) as ArticlesResponse;
    return res;
  } catch (error) {
    throw new Error('error');
  }
};

export const getArticles = async (offset: number, token?: string): Promise<ArticlesResponse> => {
  try {
    const response = (await sendRequest({
      url: `/articles?limit=5&offset=${offset}`,
      method: 'get',
      token,
    })) as ArticlesResponse;

    return response;
  } catch (error) {
    throw new Error(`error ${error}`);
  }
};

export const createArticle = async (data: FormState, token: string): Promise<ArticlesResponse> => {
  const { title, description, body, tagList } = data;

  try {
    const res = (await sendRequest({
      url: '/articles',
      method: 'post',
      data: {
        article: {
          title,
          description,
          body,
          tagList: tagList.map((tag) => tag.name),
        },
      },
      token,
    })) as unknown as ArticlesResponse;

    return res;
  } catch (error) {
    throw new Error('error');
  }
};

export const updateArticle = async (slug: Pick<ArticleTypes, 'slug'>, data: FormState, token: string) => {
  try {
    const { title, description, body, tagList } = data;
    const res = await sendRequest({
      url: `/articles/${slug}`,
      method: 'put',
      data: {
        article: {
          title,
          description,
          body,
          tagList: tagList ? tagList.map((tag) => tag.name) : [''],
        },
      },
      token,
    });

    return res;
  } catch (error) {
    throw new Error('Error updating article');
  }
};

export const deleteArticle = async (slug: Pick<ArticleTypes, 'slug'>, token: string): Promise<void> => {
  try {
    await sendRequest({
      url: `/articles/${slug}`,
      method: 'DELETE',
      token,
    });
  } catch (error) {
    throw new Error('Не удалось удалить статью.');
  }
};
