import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ArticleList from './components/ArticleList/ArticleList';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import EditProfile from './pages/EditProfile/EditProfile';
import CreateArticle from './pages/CreateArticle/CreateArticle';
import EditArticle from './pages/EditArticle/EditArticle';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ArticleList />} />
        <Route path="articles/:id" element={<ArticlePage />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="profile" element={<EditProfile />} />
        <Route path="new-article" element={<CreateArticle />} />
        <Route path="articles/:id/edit-article" element={<EditArticle />} />
      </Route>
    </Routes>
  );
}

export default App;
