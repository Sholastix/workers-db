import { SET_ALERT, REMOVE_ALERT } from '../actions/actionTypes';

// Initial state for reducer.
const initialState = [];

// Reducer. 
// Object 'action' contains two properties: 'type' (mandatory), 'payload' (basically its a data).
const alert = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  };
};

export default alert;