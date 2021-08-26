import { VFC } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';
import Header from '../organisms/Header';
import Rows from '../organisms/Rows';
import Footer from '../organisms/Footer';

const Home: VFC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      <Header />
      {isAuthenticated ? <p>ログインしてる</p> : <p>ログインしてない</p>}{' '}
      <Rows />
      <Footer />
    </div>
  );
};
export default Home;
