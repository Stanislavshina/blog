import React from 'react';
import ReactMarkdown from 'react-markdown';
import { truncateText } from '../../utils/truncate';
import ArticleHeader from '../ArticleHeader/ArticleHeader';
import { ArticleTypes } from '../../types/ArticleTypes';
import cl from './ArticlePreview.module.scss';

interface ArticlePreviewProps {
  article: ArticleTypes;
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {
  const { author, body, favoritesCount, title, updatedAt, tagList, slug, favorited } = article;
  console.log(article);

  const { image, username } = author;
  const bodyText = body ? truncateText(body, 100) : '';

  return (
    <li className={cl['preview']}>
      <ArticleHeader
        favorited={favorited}
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

export default ArticlePreview;
