import React, { useEffect, useState } from 'react';
import { ArticleTypes } from '../../types/ArticleTypes';
import { LoadingOutlined } from '@ant-design/icons';
import { Popconfirm, Button } from 'antd';

import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/storeHooks';
import cl from './ArticlePage.module.scss';
import Buttons from '../../components/UI/Button/Button';
import ArticleHeader from '../../components/ArticleHeader/ArticleHeader';
import { deleteArticle } from '../../api/article/article';

const ArticlePage: React.FC = () => {
  const [data, setData] = useState<ArticleTypes | null>(null);
  const { username } = useAppSelector((state) => state.user);
  const { id } = useParams();
  const { token } = useAppSelector((state) => state.user);
  useEffect(() => {
    axios
      .get(`https://blog.kata.academy/api/articles/${id}`, {
        headers: token ? { Authorization: `Token ${token}` } : {},
      })
      .then((d) => setData(d.data.article));
  }, [id, token]);

  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    await deleteArticle(id, token);
    navigate('/');
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  if (!data) return <div>{antIcon}</div>;
  const btnGroup =
    data.author.username === username ? (
      <div className={cl['article__buttons-block']} style={{ alignSelf: 'flex-end' }}>
        <Popconfirm
          placement="right"
          title="Are you sure to delete this article?"
          onConfirm={() => handleDelete(id as string)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="link"
            style={{
              cursor: 'pointer',
              border: '1px solid #F5222D',
              borderRadius: '5px',
              padding: '6px 15px',
              color: ' #F5222D',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              width: '78px',
              height: '31px',
            }}
          >
            Delete
          </Button>
        </Popconfirm>
        <Buttons
          typeButton={'edete'}
          linkType={'simple'}
          children={'edete'}
          to={`/articles/${data.slug}/edit-article`}
        />
      </div>
    ) : null;

  return (
    <article className={cl['article']}>
      <ArticleHeader
        favorited={data.favorited}
        favoritesCount={data.favoritesCount}
        title={data.title}
        slug={data.slug}
        image={data.author.image}
        username={data.author.username}
        updatedAt={data.updatedAt}
        tagList={data.tagList}
        link={false}
      />
      {btnGroup}
      <div className={cl['article__describe']}>{data.description ? <p>{data.description}</p> : null}</div>
      <main>
        <ReactMarkdown children={data.body} className={cl['article__body']} />
      </main>
    </article>
  );
};

export default ArticlePage;
