import { useState, useEffect, createContext, VFC } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router';
// import Cookies from "js-cookie";

import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import Home from './presentational/pages/Home';
import LogIn from './presentational/pages/LogIn';
import SignUp from './presentational/pages/SignUp';
import Client from './presentational/pages/Client';
import ForgetPw from './presentational/pages/ForgetPw';
import ResetPw from './presentational/pages/ResetPw';

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

const App: VFC = () => (
  <div className="App">
    <ThemeProvider theme={customTheme}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/client">
          <Client />
        </Route>
        <Route path="/pwforget">
          <ForgetPw />
        </Route>
        <Route path="/resetpw">
          <ResetPw />
        </Route>
      </Switch>
    </ThemeProvider>
  </div>
);

export default App;
