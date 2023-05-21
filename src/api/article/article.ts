
import {sendRequest} from '../request';
import { FormState } from "../../types/Form";
import { ArticleTypes } from "../../types/ArticleTypes";


interface ArticlesResponse {
  articles: ArticleTypes[];
  articlesCount: number;
}



export const getArticles = async (offset: number): Promise<ArticlesResponse>  => {
  try {
    const response = await sendRequest({
      url: `/articles?limit=5&offset=${offset}`,
      method: "get",
    }) as ArticlesResponse;

    return response;
  } catch (error) {
    throw new Error(`error ${error}`);
  }
};

export const createArticle = async (data: FormState, token: string | null) => {
  const { title, description, body, tagList } = data;

  try {
    const res = await sendRequest({
      url: "/articles",
      method: "post",
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
    throw new Error("error");
  }
};

export const updateArticle = async (data: ArticleTypes, token: string | null) => {
  try {
    const { title, description, body } = data;
    const res = await sendRequest({
      url: "/articles",
      method: "put",
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
    throw new Error("error");
  }
};