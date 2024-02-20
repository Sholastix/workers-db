import axios from 'axios';

import { 
  AUTH_ERROR,
  SIGNIN_SUCCESS, 
  SIGNIN_FAILURE, 
  SIGNOUT,
  SIGNUP_SUCCESS, 
  SIGNUP_FAILURE, 
  USER_SIGNED_IN 
} from './actionTypes';

import { setAlert } from './alert';
import setAuthToken from '../../utils/setAuthToken';

// Check if user already signed in (basically we check if there is a token in Local Storage).
export const isUserSigned = () => async dispatch => {
  try {
    // If there is token in LocalStorage, then we put it in global header.
    if (localStorage.token) {
      setAuthToken();
    };

    const user = await axios.get('/api/auth');

    if(!user.data) {
      throw new Error('NO USER!');
    };

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

// Signup of the new user.
export const signup = (props) => async dispatch => {
  try {
    const newUser = await axios.post('/api/users', {
      username: props.username,
      email: props.email,
      password: props.password
    });

    // console.log({ 'SIGNUP_TOKEN: ': newUser.data.signedToken }); // get the token.

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: newUser.data
    });

    // We set our general app in way that when new user finished his registration - he immediately received web-token.
    // We need to insert this token into the global header right now so that the user can get the data from the protected routes without additional manipulations (page reload, signin form etc.). 
    dispatch(isUserSigned());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors.length > 0) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'failure')));
    };

    dispatch({
      type: SIGNUP_FAILURE,
    });

    console.error(err);
  };
};

// Signin of the existed user.
export const signin = (props) => async dispatch => {
  try {
    const user = await axios.post('/api/auth', {
      email: props.email,
      password: props.password
    });

    // console.log({ 'SIGNIN_TOKEN: ': user.data.signedToken }); // get the token.

    dispatch({
      type: SIGNIN_SUCCESS,
      payload: user.data
    });

    dispatch(isUserSigned());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors.length > 0) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'failure')));
    };

    dispatch({
      type: SIGNIN_FAILURE,
    });

    console.error(err);
  };
};

// Signout.
export const signout = () => dispatch => {
  try {
    dispatch ({
      type: SIGNOUT
    });
  } catch (err) {
    console.error(err);
  };
};