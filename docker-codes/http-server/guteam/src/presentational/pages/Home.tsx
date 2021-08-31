import { VFC, useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';
import Header from '../organisms/Header';
import Rows from '../organisms/Rows';
import Footer from '../organisms/Footer';

const Home: VFC = () => {
  const { isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently } =
    useAuth0();

  const [token, setToken] = useState<string>('');
  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({});
        setToken(accessToken);
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log(e.message);
      }
    };
    void getToken();
  }, [getAccessTokenSilently]);

  return (
    <div>
      <Header />
      <Rows />
      <Footer />
    </div>
  );
};
export default Home;
