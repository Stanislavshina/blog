import React, { useEffect, useState } from 'react';
import { ArticleTypes } from '../../types/ArticleTypes';
import { LoadingOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/storeHooks';
import cl from './ArticlePage.module.scss'
import Button from '../../components/UI/Button/Button';
import ArticleHeader from '../../components/ArticleHeader/ArticleHeader';


const ArticlePage: React.FC = () => {
  const [data, setData] = useState<ArticleTypes | null>(null);
  const author = useAppSelector((state) => state.user);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://blog.kata.academy/api/articles/${id}`)
      .then((d) => setData(d.data.article));
  }, [id]);

  const navigate = useNavigate();

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  if (!data) return <div>{antIcon}</div>;
  const btnGroup =
    data.author.username === author.username ? (
      <div
        className={cl["article__buttons-block"]}
        style={{ alignSelf: "flex-end" }}
      >
        <Popconfirm
          placement="right"
          title="Are you sure to delete this article?"
          onConfirm={() => navigate("/")}
          onCancel={() => console.log("no")}
          okText="Yes"
          cancelText="No"
        >
          <Button typeButton={'delete'}  linkType={'simple'}>
            Delete
          </Button>
        </Popconfirm>
        <Button typeButton={'edete'} linkType={'simple'} children={'edete'} to='/articles/${data.slug}/edit-article'/>
      </div>
    ) : null;

  return (
    <article className={cl["article"]}>
      <ArticleHeader
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
      <div className={cl["article__describe"]}>
        {data.description ? <p>{data.description}</p> : null}
      </div>
      <main>
        <ReactMarkdown children={data.body} className={cl["article__body"]} />
      </main>
    </article>
  );
};

export default ArticlePage;
