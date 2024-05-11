import axios from 'axios';

// If there is token in LocalStorage, then we put it in global header.
const setAuthToken = () => {
  // 'x-auth-token' - thats how we named this variable on server side ('middleware' dir -> 'auth.js').
  if (localStorage.token) {
    axios.defaults.headers.common['x-auth-token'] = localStorage.token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
    console.log('ERROR: Token not found in LS.');
  };
};

export default setAuthToken;