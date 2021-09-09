/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import store from 'common/stores/index';

import App from './App';
import './index.css';

import reportWebVitals from './reportWebVitals';

const domain: any = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId: any = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience: any = process.env.REACT_APP_AUTH0_AUDIENCE;

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    audience={audience}
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
