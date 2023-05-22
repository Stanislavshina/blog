export interface ArticleTypes {
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: [{ name: string }];
  title: string;
  updatedAt: string;
}
