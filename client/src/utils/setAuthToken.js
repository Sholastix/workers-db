import axios from 'axios';

const setAuthToken = () => {
  // 'x-auth-token' - thats how we named this variable on server side ('middleware' dir -> 'auth.js').
  if (localStorage.token) {
    axios.defaults.headers.common['x-auth-token'] = localStorage.token;
    console.log('setAuthToken(): ', localStorage.token);
  } else {
    console.log('setAuthToken(): NO TOKENS FOUND IN LOCAL STORAGE.');
    // delete axios.defaults.headers.common['x-auth-token'];
  };
};

export default setAuthToken;