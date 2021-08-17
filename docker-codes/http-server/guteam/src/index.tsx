import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

// const theme = createMuiTheme({
//   palette: {
//     primary: '#4D217C',
//     secondary: 'D6C2DE',
//   },
// });

ReactDOM.render(
  // <MuiThemeProvider theme={theme}>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  // </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
