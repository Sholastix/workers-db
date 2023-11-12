import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import cssStyles from './EmployeesList.module.css';

const EmployeesList = (props) => {
  const [employeesList, setEmployeesList] = useState([]);

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = async () => {
    try {
      const employees = await axios.get('http://localhost:5000/api/employees/');

      setEmployeesList(employees.data.getAllEmployees);

      // console.log('getAllEmployees():', employees.data.getAllEmployees)
    } catch (err) {
      console.error('getAllEmployees(): ', err);
    };
  };

  // Redirect to signin page if user signed out.
  if (props.isAuthenticated === false) {
    return <Navigate to='/signin' replace={true} />
  };

  return (
    <div id={cssStyles.container}>
      <header className={cssStyles.title}>
        <p>EMPLOYEES LIST</p>
      </header>

      <table className={cssStyles.table}>
        <thead className={cssStyles.tableHead}>
          <tr>
            <th>Fullname</th>
            <th>Gender</th>
            <th>Birthday</th>
            <th>Position</th>
            <th>Contacts</th>
            <th>Salary</th>
            <th>Hired</th>
          </tr>
        </thead>

        <tbody className={cssStyles.tableBody}>
          {employeesList.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.fullname}</td>
              <td>{employee.gender}</td>
              <td>{employee.birthday}</td>
              <td>{employee.position}</td>
              <td>{employee.contacts}</td>
              <td>{employee.salary}</td>
              <td>{employee.hired}</td>
            </tr>
          ))}
        </tbody>
      </table>
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