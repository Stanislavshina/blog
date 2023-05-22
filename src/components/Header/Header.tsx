import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../store/slices/userSlice';
import { useAppSelector, useAppDispatch } from '../../store/storeHooks';
import Button from '../UI/Button/Button';
import { AvatarGroup, ButtonGroup, HeaderStyled } from './HeaderStyles';
import Link from '../UI/Link/Link';

const Header: React.FC = () => {
  const { isAuth, username, image } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(logOut());
    navigate('/');
  };

  const btnGroup = isAuth ? (
    <ButtonGroup>
      <Button typeButton={'new article'} to={'/new-article'} linkType={'simple'}>
        Create article
      </Button>
      <AvatarGroup>
        <Link to={'/profile'} type={'simple'}>
          {username}
        </Link>
        <Avatar src={image} style={{ width: '46px', height: '46px' }} />
      </AvatarGroup>
      <Button typeButton={'bordered'} onSubmit={onLogout} linkType={'simple'}>
        Log Out
      </Button>
    </ButtonGroup>
  ) : (
    <ButtonGroup>
      <Button typeButton={'simple'} to={'/sign-in'} linkType={'simple'}>
        Sign In
      </Button>
      <Button typeButton={'primary'} to={'/sign-up'} linkType={'simple'}>
        Sign Up
      </Button>
    </ButtonGroup>
  );

  return (
    <HeaderStyled>
      <Link to={'/'} type="simple">
        Realworld Blog
      </Link>
      {btnGroup}
    </HeaderStyled>
  );
};

export default Header;
