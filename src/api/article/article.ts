import { sendRequest } from '../request';
import { FormState } from '../../types/Form';
import { ArticleTypes } from '../../types/ArticleTypes';

interface ArticlesResponse {
  articles: ArticleTypes[];
  articlesCount: number;
}

export const getArticles = async (offset: number): Promise<ArticlesResponse> => {
  try {
    const response = (await sendRequest({
      url: `/articles?limit=5&offset=${offset}`,
      method: 'get',
    })) as ArticlesResponse;

    return response;
  } catch (error) {
    throw new Error(`error ${error}`);
  }
};

export const createArticle = async (data: FormState, token: string | null | undefined) => {
  const { title, description, body, tagList } = data;

  try {
    const res = await sendRequest({
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
    });

    return res;
  } catch (error) {
    throw new Error('error');
  }
};

export const updateArticle = async (slug: string | undefined, data: ArticleTypes, token: string | null | undefined) => {
  try {
    const { title, description, body } = data;
    const res = await sendRequest({
      url: `/articles/${slug}`,
      method: 'put',
      data: {
        article: {
          title,
          description,
          body,
        },
      },
      token,
    });

    return res;
  } catch (error) {
    throw new Error('Error updating article');
  }
};

export const deleteArticle = async (articleSlug: string, token: string | null | undefined): Promise<void> => {
  try {
    await sendRequest({
      url: `/articles/${articleSlug}`,
      method: 'DELETE',
      token,
    });
  } catch (error) {
    throw new Error('Не удалось удалить статью.');
  }
};
