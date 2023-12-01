import { 
  GET_EMPLOYEE_PROFILES, 
  GET_EMPLOYEE_PROFILES_ERROR, 
  DELETE_EMPLOYEE_PROFILE, 
  DELETE_EMPLOYEE_PROFILE_ERROR,
  CREATE_EMPLOYEE_PROFILE,
  CREATE_EMPLOYEE_PROFILE_ERROR,
  UPDATE_EMPLOYEE_PROFILE,
  UPDATE_EMPLOYEE_PROFILE_ERROR
} from '../actions/actionTypes';

// Initial state for reducer.
const initialState = {
  employee: {},
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

export const createEmployee = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EMPLOYEE_PROFILE:
      return {
        ...state,
        employee: action.payload,
        loading: false
      };
    case CREATE_EMPLOYEE_PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  };
};

export const updateEmployee = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_EMPLOYEE_PROFILE:
      return {
        ...state,
        employee: action.payload,
        loading: false
      };
    case UPDATE_EMPLOYEE_PROFILE_ERROR:
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