import { v4 as uuidv4 } from 'uuid';

import { SET_ALERT, REMOVE_ALERT } from './actionTypes';

export const setAlert = (msg, alertType) => async dispatch => {
  try {
    const id = uuidv4();

    dispatch({
      type: SET_ALERT,
      payload: { id, alertType, msg }
    });

    // Here we set automatic removal of alert messages.
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 3000);
  } catch (err) {
    console.error(err);
  };
};