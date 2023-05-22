import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import { converTime } from '../../utils/convertTime';
import { nanoid } from 'nanoid';
import cl from './ArticleHeader.module.scss';
import useFavorite from '../../hooks/useFavorite';
import Link from '../UI/Link/Link';
import { useAppSelector } from '../../store/storeHooks';

interface ArticleHeaderProps {
  slug: string;
  updatedAt: string;
  title: string;
  favoritesCount: number;
  tagList: string[];
  username: string;
  image: string;
  link: boolean;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  slug,
  updatedAt,
  title,
  favoritesCount,
  tagList,
  username,
  image,
  link,
}) => {
  const { favorite, count, handleClick } = useFavorite(slug, favoritesCount);
  const { isAuth } = useAppSelector((state) => state.user);

  const titleLink = link ? (
    <Link to={`articles/${slug}`} type={'primary'}>
      {title}
    </Link>
  ) : (
    <h4 className={cl['header__title']}>{title}</h4>
  );
  const date = converTime(updatedAt);
  const tags = tagList.length ? (
    <ul className={cl['header__tag-list']}>
      {tagList.map((el: string) => (
        <li key={nanoid()} className={cl['header__tag']}>
          {el}
        </li>
      ))}
    </ul>
  ) : null;
  const postButton = (
    <Button
      onClick={handleClick}
      style={{ border: 'none', width: '13px' }}
      disabled={!isAuth}
      icon={favorite ? <HeartFilled style={{ color: '#FF0707' }} /> : <HeartOutlined />}
    />
  );
  return (
    <header className={cl['header']}>
      <div className={cl['header__left-col']}>
        <div className={cl['header__title-block']}>
          {titleLink}
          <div className={cl['header__favorited']}>
            {postButton}
            <span className={cl['header__favorited-span']}>{count}</span>
          </div>
        </div>
        {tags}
      </div>
      <div className={cl['header__right-col']}>
        <div className="header__author-bio">
          <p className={cl['header__author-name']}>{username}</p>
          <span className={cl['header__time']}>{date}</span>
        </div>
        <Avatar src={image} style={{ width: '46px', height: '46px' }} />
      </div>
    </header>
  );
};

export default ArticleHeader;
