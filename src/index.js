import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import axios from 'axios';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from '@auth0/auth0-react';
axios.defaults.baseURL = "https://misnotas-backend.herokuapp.com/"
// axios.defaults.baseURL = "http://localhost:3001" ;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Auth0Provider
      domain="dev-i4zjlacc.us.auth0.com"
      clientId="L541OW1j9jE4UX57r7Q8XFF34ZVdNz8T"
      redirectUri={window.location.origin}
    >
    <App />
  </Auth0Provider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

