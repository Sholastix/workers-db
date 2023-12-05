import {
  AUTH_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNOUT,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  USER_SIGNED_IN
} from '../actions/actionTypes';

// Initial state for reducer.
const initialState = {
  isAuthenticated: null,
  loading: true,
  token: localStorage.getItem('token'),
  user: null
};

// Object 'action' contains two properties: 'type' (mandatory), 'payload' (basically its a data).
const auth = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNED_IN:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case SIGNUP_SUCCESS:
    case SIGNIN_SUCCESS:
      localStorage.setItem('token', action.payload.signedToken);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_ERROR:
    case SIGNIN_FAILURE:
    case SIGNOUT:
    case SIGNUP_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null
      };
    default:
      return state;
  };
};

export default auth;