import axios from 'axios';

import { SIGNUP_SUCCESS, SIGNUP_FAILURE, USER_SIGNED_IN, AUTH_ERROR } from './actionTypes';
import { setAlert } from './alert';
import setAuthToken from '../../utils/setAuthToken';

// Check if user already signed in (basically we check if there is a token in Local Storage).
export const isUserSigned = () => async dispatch => {
  try {
    // If there is token in LS, then we put it in global header.
    if (localStorage.token) {
      setAuthToken();
    };

    const user = await axios.get('http://localhost:5000/api/auth');
    
    dispatch({
      type: USER_SIGNED_IN,
      payload: user.data
    });

    // console.log('isUserSigned(): ', user.data);
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