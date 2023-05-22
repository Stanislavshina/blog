import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/storeHooks';
import { setFavorited, deleteFavorited } from '../api/article/favorited';

const useFavorite = (slug: string, favoritesCount: number) => {
  const { isAuth, token } = useAppSelector((state) => state.user);
  const [favorite, setFavorite] = useState(() => isAuth && Boolean(localStorage.getItem(slug)));
  const [count, setCount] = useState(favoritesCount);

  const handleClick = () => {
    if (!favorite) {
      if (token) {
        setFavorited(slug, token)
          .then((d: unknown) => {
            {
              const articleSlug = (d as { article: { slug: string } }).article.slug;
              localStorage.setItem(articleSlug, articleSlug);
            }
          })
          .then(() => {
            setFavorite(true);
            setCount((count) => count + 1);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } else {
      if (token) {
        deleteFavorited(slug, token)
          .then((d: unknown) => {
            const articleSlug = (d as { article: { slug: string } }).article.slug;
            localStorage.removeItem(articleSlug);
          })
          .then(() => {
            setFavorite(false);
            setCount((count) => count - 1);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (!isAuth) return setFavorite(false);
    }, 100);
  }, [isAuth]);

  return {
    favorite,
    count,
    handleClick,
  };
};

export default useFavorite;
