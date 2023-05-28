import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import { useAppDispatch } from '../../store/storeHooks';
import { checkAndLogToken } from '../../api/user/user';
import { useEffect } from 'react';
import { login } from '../../store/slices/userSlice';
import { User } from './../../types/User';

const Layout: React.FC = () => {
  const dispatch = useAppDispatch();
  const getLogIn = async () => {
    try {
      const res = await checkAndLogToken();
      await dispatch(login(res as User));
    } catch (error) {
      throw new Error(`Выкидывает из логина`);
    }
  };

  useEffect(() => {
    getLogIn();
  });
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
