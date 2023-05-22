import React from 'react';
import cl from './PostItem.module.scss';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { ArticleTypes } from '../../types/ArticleTypes';
import ArticleHeader from '../ArticleHeader/ArticleHeader';
import { truncateText } from '../../utils/truncate';

interface PostPreviewProps {
  post: ArticleTypes;
}

const Article: React.FC<PostPreviewProps> = ({ post }) => {
  const { author, body, favoritesCount, title, updatedAt, tagList, slug } = post;
  const { image, username } = author;
  const bodyText = truncateText(body, 100);

  return (
    <li className={cl['preview']}>
      <ArticleHeader
        favoritesCount={favoritesCount}
        title={title}
        slug={slug}
        image={image}
        username={username}
        updatedAt={updatedAt}
        tagList={tagList}
        link={true}
      />
      <main className={cl['preview__body']}>{bodyText && <ReactMarkdown children={bodyText} />}</main>
    </li>
  );
};

export default Article;
