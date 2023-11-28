import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import { getAllEmployees, deleteEmployee } from './employees';

const rootReducer = combineReducers({
  alert,
  auth,
  getAllEmployees,
  deleteEmployee
});

export default rootReducer;