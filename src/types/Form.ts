import { ArticleTypes } from './ArticleTypes';

export interface FormState extends ArticleTypes {
  title: string;
  description: string;
  body: string;
  tagList: [
    {
      name: string;
    }
  ];
}
