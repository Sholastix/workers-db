import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App.jsx';

import { isUserSigned } from './redux/actions/auth.js';
import store from './redux/store/store';

// Check if user signed in when app starts first time.
if (localStorage.token) {
  store.dispatch(isUserSigned());
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
