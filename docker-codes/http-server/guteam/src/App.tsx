import { VFC } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

import Home from 'presentational/pages/Home';
import Client from 'presentational/pages/Client';
import { ProtectedRoute } from 'common/ProtectedRoute';
import Terms from 'presentational/pages/Terms';

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
              <Route exact path="/terms" component={Terms} />
              <ProtectedRoute path="/client" component={Client} />
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      )}
    </div>
  );
};
export default App;
