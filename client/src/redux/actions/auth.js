import axios from 'axios';

import { SIGNUP_SUCCESS, SIGNUP_FAILURE } from './actionTypes';
import { setAlert } from './alert';

export const signup = (props) => async dispatch => {
  try {
    const newUser = await axios.post('http://localhost:5000/api/users', {
      username: props.username,
      email: props.email,
      password: props.password
    });

    // console.log({ 'NEW_USER\'S_DATA: ': newUser.data }); // get user's data.
    // console.log({ 'TOKEN: ': newUser.data.signedToken }); // get the token.

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: newUser.data
    });
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