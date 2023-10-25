import { v4 as uuidv4 } from 'uuid';

import { SET_ALERT, REMOVE_ALERT } from './actionTypes';

export const setAlert = (msg, alertType) => {
  return async (dispatch) => {
    try {
      const id = uuidv4();

      dispatch({
        type: SET_ALERT,
        payload: { id, alertType, msg }
      });
    } catch (err) {
      console.error(err);
    };
  };
};

export const removeAlert = (alertType, msg) => {
  return async (dispatch) => {
    try {

    } catch (err) {
      console.error(err);
    };
  };
};