import axios from 'axios';

import {
  GET_EMPLOYEE_PROFILES,
  GET_EMPLOYEE_PROFILES_ERROR,
  GET_EMPLOYEE_PROFILE,
  GET_EMPLOYEE_PROFILE_ERROR,
  DELETE_EMPLOYEE_PROFILE,
  DELETE_EMPLOYEE_PROFILE_ERROR,
  CREATE_EMPLOYEE_PROFILE,
  CREATE_EMPLOYEE_PROFILE_ERROR,
  UPDATE_EMPLOYEE_PROFILE,
  UPDATE_EMPLOYEE_PROFILE_ERROR
} from './actionTypes';

import { setAlert } from './alert';

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

// Get one employee profile.
export const getOneEmployee = (id) => async dispatch => {
  try {
    const employee = await axios.get(`http://localhost:5000/api/employees/${id}`);

    dispatch({
      type: GET_EMPLOYEE_PROFILE,
      payload: employee.data.getOneEmployee,
    });

    console.log('getOneEmployee():', employee.data.getOneEmployee);
  } catch (err) {
    dispatch({
      type: GET_EMPLOYEE_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    console.error('getOneEmployee(): ', err.response.data);
  };
};

// Create selected employee's profile.
export const createEmployee = (props) => async dispatch => {
  try {
    // Here we creating employee's profile.
    // VARIANT 1.
    const formData = new FormData();
    formData.append('photo', props.photo);
    formData.append('fullname', props.fullname);
    formData.append('gender', props.gender);
    formData.append('birthday', props.birthday);
    formData.append('contacts', props.contacts);
    formData.append('position', props.position);
    formData.append('salary', props.salary);
    formData.append('hired', props.hired);

    const newEmployee = await axios.post('http://localhost:5000/api/employees', formData);

    // // VARIANT 2.
    // const newEmployee = await axios.postForm('http://localhost:5000/api/employees', {
    //   photo: props.photo,
    //   fullname: props.fullname,
    //   gender: props.gender,
    //   birthday: props.birthday,
    //   contacts: props.contacts,
    //   position: props.position,
    //   salary: props.salary,
    //   hired: props.hired
    // });

    dispatch({
      type: CREATE_EMPLOYEE_PROFILE,
      payload: newEmployee.data.newEmployee,
    });

    console.log('createEmployee(): ', newEmployee.data.newEmployee);

    // And here we refreshing our employee profiles list.
    const employees = await axios.get('http://localhost:5000/api/employees/');

    dispatch({
      type: GET_EMPLOYEE_PROFILES,
      payload: employees.data.getAllEmployees,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    // console.log('ARRAY_OF_ERRORS: ', errors);

    if (errors.length > 0) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'failure')));
    };

    dispatch({
      type: CREATE_EMPLOYEE_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    console.error('createEmployee(): ', err);
  };
};

// Update selected employee's profile.
export const updateEmployee = (id, props) => async dispatch => {
  try {
    // Here we updating employee's profile.
    // VARIANT 1.
    const formData = new FormData();
    formData.append('photo', props.photo);
    formData.append('fullname', props.fullname);
    formData.append('gender', props.gender);
    formData.append('birthday', props.birthday);
    formData.append('contacts', props.contacts);
    formData.append('position', props.position);
    formData.append('salary', props.salary);
    formData.append('hired', props.hired);

    const updateEmployee = await axios.put(`http://localhost:5000/api/employees/${id}`, formData);

    // // VARIANT 2.
    // const updateEmployee = await axios.putForm(`http://localhost:5000/api/employees/${id}`, {
    //   photo: props.photo,
    //   fullname: props.fullname,
    //   gender: props.gender,
    //   birthday: props.birthday,
    //   contacts: props.contacts,
    //   position: props.position,
    //   salary: props.salary,
    //   hired: props.hired
    // });

    dispatch({
      type: UPDATE_EMPLOYEE_PROFILE,
      payload: updateEmployee.data.updateEmployee,
    });

    console.log('updateEmployee(): ', updateEmployee.data.updateEmployee);

    // And here we refreshing our employee profiles list.
    const employees = await axios.get('http://localhost:5000/api/employees/');

    dispatch({
      type: GET_EMPLOYEE_PROFILES,
      payload: employees.data.getAllEmployees,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors.length > 0) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'failure')));
    };

    dispatch({
      type: UPDATE_EMPLOYEE_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    console.error('updateEmployee(): ', err);
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