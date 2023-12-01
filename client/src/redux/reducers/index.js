import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import { getAllEmployees, deleteEmployee, createEmployee, updateEmployee } from './employees';

const rootReducer = combineReducers({
  alert,
  auth,
  getAllEmployees,
  deleteEmployee,
  createEmployee,
  updateEmployee
});

export default rootReducer;