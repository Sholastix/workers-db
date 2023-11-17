import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import cssStyles from './EmployeesList.module.css';

const EmployeesList = (props) => {
  const [employeesList, setEmployeesList] = useState([]);

  useEffect(() => {
    getAllEmployees();
  }, []);

  // Get all profiles of employees.
  const getAllEmployees = async () => {
    try {
      const employees = await axios.get('http://localhost:5000/api/employees/');

      setEmployeesList(employees.data.getAllEmployees);
      console.log('getAllEmployees():', employees.data.getAllEmployees);
    } catch (err) {
      console.error('getAllEmployees(): ', err.response.data);
    };
  };

  // Delete specific employee.
  const deleteEmployee = async (id) => {
    try {
      const deletedEmployee = await axios.delete(`http://localhost:5000/api/employees/${id}`);

      const updatedEmployeesList = employeesList.filter((employee) => {
        return employee._id !== id;
      });

      setEmployeesList(updatedEmployeesList);
      console.log('deleteEmployee(): ', deletedEmployee.data.msg);
    } catch (err) {
      console.error('deleteEmployee(): ', err);
    };
  };

  // Redirect to targeted page. 
  // Here we using hook 'useNavigate with <button>, but as alternative we can just use without any hooks this: <Link to='/our-targeted-route'>Edit</Link> as we do with 'employee create form'.
  const navigate = useNavigate();

  // // Redirect to signin page if user signed out.
  // if (props.isAuthenticated === false) {
  //   return <Navigate to='/signin' replace={true} />
  // };

  return (
    <div id={cssStyles.container}>
      <div className={cssStyles.link}>
        <Link to='/employees-create-form' className={cssStyles.linkCreate}>Create New Profile</Link>
      </div>
      <header className={cssStyles.title}>
        <p>LIST OF EMPLOYEES</p>
      </header>
      {
        employeesList.length > 0
          ?
          <table className={cssStyles.table}>
            <thead className={cssStyles.tableHead}>
              <tr>
                <th>Photo</th>
                <th>Fullname</th>
                <th>Gender</th>
                <th>Birthday</th>
                <th>Position</th>
                <th>Contacts</th>
                <th>Salary</th>
                <th>Hired</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody className={cssStyles.tableBody}>
              {employeesList.map((employee) => (
                <tr key={employee._id}>
                  <td><img src={`/photos/${employee.photo}`} className={cssStyles.photo} /></td>
                  <td>{employee.fullname}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.birthday}</td>
                  <td>{employee.position}</td>
                  <td>{employee.contacts}</td>
                  <td>{employee.salary}</td>
                  <td>{employee.hired}</td>
                  <td>
                    {/* <Link to='/employees-edit-form'>Edit</Link> */}
                    <button onClick={() => { navigate('/employees-edit-form') }} className={cssStyles.button}>Edit</button>
                    <button onClick={() => { deleteEmployee(employee._id) }} className={cssStyles.button}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          :
          <div className={cssStyles.message}>
            <p>NO PROFILES TO DISPLAY</p>
          </div>
      }
    </div>
  );
};

EmployeesList.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = null;

// 'connect()' function connects a React component to a Redux store.
export default connect(mapStateToProps, mapDispatchToProps)(EmployeesList);