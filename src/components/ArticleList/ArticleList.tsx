import { Pagination } from 'antd';
import { nanoid } from 'nanoid';
import React, { useCallback, useEffect } from 'react';
import { fetchArticles, setNextPage } from '../../store/slices/articleSlice';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import cl from './ArticleList.module.scss';
import ArticlePreview from '../ArticlePreview/ArticlePreview';

const ArticleList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, page, totalArticlesCount } = useAppSelector((state) => state.artickles);

  const getData = useCallback(() => {
    return dispatch(fetchArticles((page - 1) * 5));
  }, [page, dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <main className={cl['main']}>
      <ul className={cl['posts-list']}>
        {articles.map((art) => (
          <ArticlePreview key={nanoid()} article={art} />
        ))}
      </ul>
      <Pagination
        onChange={(page) => dispatch(setNextPage(page))}
        defaultCurrent={1}
        current={page}
        total={totalArticlesCount}
        showSizeChanger={false}
      />
    </main>
  );
};

export default ArticleList;
