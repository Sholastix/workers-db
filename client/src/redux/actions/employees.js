import axios from 'axios';

import { GET_EMPLOYEE_PROFILES, GET_EMPLOYEE_PROFILES_ERROR, DELETE_EMPLOYEE_PROFILE, DELETE_EMPLOYEE_PROFILE_ERROR } from './actionTypes';

// Get all employee profiles.
export const getAllEmployees = () => async dispatch => {
  try {
    const employees = await axios.get('http://localhost:5000/api/employees/');

    if (employees.data.getAllEmployees.length > 0) {
      dispatch({
        type: GET_EMPLOYEE_PROFILES,
        payload: employees.data.getAllEmployees,
      });

      console.log('getAllEmployees():', employees.data.getAllEmployees);
    } else {
      console.log('getAllEmployees(): NO PROFILES FOUND.');
    };
  } catch (err) {
    dispatch({
      type: GET_EMPLOYEE_PROFILES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    console.error('getAllEmployees(): ', err.response.data);
  };
};

// Delete selected employee's profile.
export const deleteEmployee = (id) => async dispatch => {
  try {
    // Here we deleting employee's profile.
    const deletedEmployee = await axios.delete(`http://localhost:5000/api/employees/${id}`);

    dispatch({
      type: DELETE_EMPLOYEE_PROFILE
    });

    // And here we refreshing our employee profiles list.
    const employees = await axios.get('http://localhost:5000/api/employees/');

    dispatch({
      type: GET_EMPLOYEE_PROFILES,
      payload: employees.data.getAllEmployees,
    });

    console.log('deleteEmployee(): ', deletedEmployee.data.msg);
  } catch (err) {
    dispatch({
      type: DELETE_EMPLOYEE_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    console.error('deleteEmployee(): ', err);
  };
};