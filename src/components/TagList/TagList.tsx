import React, { useState } from 'react';
import cl from './TagList.module.scss';
import { truncateText } from '../../utils/truncate';
import { nanoid } from 'nanoid';

interface TagListProps {
  tagList: string[];
}

const TagList: React.FC<TagListProps> = ({ tagList }) => {
  const [showAllTags, setShowAllTags] = useState(false);
  console.log(tagList.length);

  const truncatedTags = showAllTags ? tagList : tagList.slice(0, 10);

  const handleShowAllTags = () => {
    setShowAllTags(!showAllTags);
  };
  if (tagList.length === 0) return null;
  return (
    <div className={cl['tags']}>
      <ul className={cl['tag-list']}>
        {truncatedTags.map((el: string) => (
          <li key={nanoid()} className={cl['tag']}>
            {truncateText(el, 10)}
          </li>
        ))}
        {tagList.length > 10 && (
          <button onClick={handleShowAllTags} className={cl['show-all']}>
            {showAllTags ? 'Cкрыть теги' : 'Показать все теги'}
          </button>
        )}
      </ul>
    </div>
  );
};

export default TagList;
