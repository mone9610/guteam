import { useState, useEffect, createContext, VFC } from 'react';
import './App.css';
import { Switch, Route, BrowserRouter, Router } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Typography from '@material-ui/core/Typography';

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
  const [role, setRole] = useState<string>('');
  const { isLoading } = useAuth0();

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
