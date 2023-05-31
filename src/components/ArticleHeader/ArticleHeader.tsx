import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import { converTime } from '../../utils/convertTime';
import cl from './ArticleHeader.module.scss';
import Link from '../UI/Link/Link';
import { useAppSelector } from '../../store/storeHooks';
import useFavorite from '../../hooks/useFavorite';
import { truncateText } from '../../utils/truncate';
import TagList from '../TagList/TagList';

interface ArticleHeaderProps {
  slug: string;
  updatedAt: string;
  title: string;
  favoritesCount: number;
  tagList: string[];
  username: string;
  image: string;
  link: boolean;
  favorited: boolean;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  slug,
  updatedAt,
  title,
  favoritesCount,
  tagList,
  username,
  image,
  favorited,
  link,
}) => {
  const { favorite, count, handleClick } = useFavorite(slug, favorited, favoritesCount);

  const { isAuth } = useAppSelector((state) => state.user);

  const truncateTitle = truncateText(title, 50);

  const titleLink = link ? (
    <Link to={`articles/${slug}`} type={'primary'}>
      {truncateTitle}
    </Link>
  ) : (
    <h4 className={cl['header__title']}>{truncateTitle}</h4>
  );
  const date = converTime(updatedAt);
  const postButton = (
    <Button
      onClick={handleClick}
      style={{ border: 'none', width: '13px', backgroundColor: '#fff' }}
      disabled={!isAuth}
      icon={favorite && isAuth ? <HeartFilled style={{ color: '#FF0707' }} /> : <HeartOutlined />}
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
        <TagList tagList={tagList} />
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
