import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import { getAllEmployees, deleteEmployee, createEmployee } from './employees';

const rootReducer = combineReducers({
  alert,
  auth,
  getAllEmployees,
  deleteEmployee,
  createEmployee
});

export default rootReducer;