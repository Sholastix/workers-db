import { 
  GET_EMPLOYEE_PROFILES, 
  GET_EMPLOYEE_PROFILES_ERROR, 
  DELETE_EMPLOYEE_PROFILE, 
  DELETE_EMPLOYEE_PROFILE_ERROR 
} from '../actions/actionTypes';

// Initial state for reducer.
const initialState = {
  employeesList: [],
  error: {},
  loading: true,
};

export const getAllEmployees = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_PROFILES:
      return {
        ...state,
        employeesList: action.payload,
        loading: false
      };
    case GET_EMPLOYEE_PROFILES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  };
};

export const deleteEmployee = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_EMPLOYEE_PROFILE:
      return {
        ...state,
        employeesList: action.payload,
        loading: false
      };
    case DELETE_EMPLOYEE_PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  };
};