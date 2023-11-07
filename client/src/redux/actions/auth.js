import axios from 'axios';

import { SIGNUP_SUCCESS, SIGNUP_FAILURE, USER_SIGNED_IN, AUTH_ERROR } from './actionTypes';
import { setAlert } from './alert';
import setAuthToken from '../../utils/setAuthToken';

// Check if user already signed in (basically we check if there is a token in Local Storage).
export const isUserSigned = () => async dispatch => {
  try {
    // If there is token in LocalStorage, then we put it in global header.
    // For this function we need our token in global headers cause in 'server -> routes -> auth.js' we get the user's ID exactly from this token which contains user's data.
    // But we already pushing tokens from LS to global headers in 'App.jsx' component, so here we don't need to repeat it for now. So we leave it here inactive just for better understanding of all auth process. 
    // if (localStorage.token) {
    //   setAuthToken();
    // };

    const user = await axios.get('http://localhost:5000/api/auth');

    dispatch({
      type: USER_SIGNED_IN,
      payload: user.data
    });

    console.log('isUserSigned(): ', user.data);
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });

    console.error('isUserSigned(): ', err);
  };
};

// Registration of the new user.
export const signup = (props) => async dispatch => {
  try {
    const newUser = await axios.post('http://localhost:5000/api/users', {
      username: props.username,
      email: props.email,
      password: props.password
    });

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: newUser.data
    });

    // localStorage.setItem('token', newUser.data.signedToken);

    // We set our general app in way that when new user finished his registration - he immediately received web-token.
    // We need to insert this token into the global header right now so that the user can get the data from the protected routes without additional manipulations (page reload, signin etc.). 
    if (localStorage.token) {
      setAuthToken();
      dispatch({
        type: USER_SIGNED_IN
      });
    };

    // console.log({ 'NEW_USER_DATA: ': newUser.data }); // get user's data.
    // console.log({ 'TOKEN: ': newUser.data.signedToken }); // get the token.
  } catch (err) {
    const errors = err.response.data.errors;
    // console.log('ARRAY_OF_ERRORS: ', errors);

    if (errors.length > 0) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'failure')));
    };

    dispatch({
      type: SIGNUP_FAILURE,
    });

    console.error(err);
  };
};