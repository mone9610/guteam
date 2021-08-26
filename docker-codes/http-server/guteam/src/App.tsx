import { useState, useEffect, createContext, VFC } from 'react';
import './App.css';
import { Switch, Route, BrowserRouter, Router } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

import Home from './presentational/pages/Home';
import Client from './presentational/pages/Client';
import { ProtectedRoute } from './utils/ProtectedRoute';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#4D217C',
    },
    secondary: {
      main: '#D6C2DE',
    },
  },
});

export const history = createBrowserHistory();

const App: VFC = () => {
  const { isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently } =
    useAuth0();
  const [token, setToken] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const { isLoading } = useAuth0();

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

  // eslint-disable-next-line @typescript-eslint/require-await
  const onRedirectCallback = async (appState: { returnTo: any }) => {
    history.replace({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      pathname: appState?.returnTo || window.location.pathname,
      search: '',
    });
  };

  const goToClient = () => {
    history.push('/client');
  };

  return (
    <div className="App">
      {isLoading ? (
        <></>
      ) : (
        <ThemeProvider theme={customTheme}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <ProtectedRoute path="/client" component={Client} />
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      )}
    </div>
  );
};
export default App;
