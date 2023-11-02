import { SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../actions/actionTypes';

// Initial state for reducer.
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

// Reducer. 
// Object 'action' contains two properties: 'type' (mandatory), 'payload' (basically its a data).
const signup = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case SIGNUP_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  };
};

export default signup;