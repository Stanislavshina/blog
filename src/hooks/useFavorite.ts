import { useState, useEffect } from 'react';

import Cookies from 'js-cookie';
import { deleteFavorited, setFavorited } from '../api/article/favorited';
import { ArticleTypes } from '../types/ArticleTypes';

const useFavorite = (slug: Pick<ArticleTypes, 'slug'>, initialFavorited: boolean, initialCount: number) => {
  const [favorite, setFavorite] = useState(initialFavorited);
  const [count, setCount] = useState(initialCount);

  const token = Cookies.get('token');

  useEffect(() => {
    setFavorite(initialFavorited);
    setCount(initialCount);
  }, [initialFavorited, initialCount]);

  const handleClick = async () => {
    try {
      if (favorite) {
        await deleteFavorited(slug, token as string);
        setCount((prevCount) => prevCount - 1);
        setFavorite(false);
      } else {
        setFavorited(slug, token as string);
        setCount((prevCount) => prevCount + 1);
        setFavorite(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { favorite, count, handleClick };
};

export default useFavorite;
