import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import { 
  createEmployee, 
  deleteEmployee, 
  getAllEmployees, 
  getOneEmployee, 
  updateEmployee 
} from './employees';

const rootReducer = combineReducers({
  alert,
  auth,
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getOneEmployee,
  updateEmployee
});

export default rootReducer;