import React, { useState, useEffect } from 'react';
import axios from 'axios';

import cssStyles from './EmployeesList.module.css';

const EmployeesList = () => {
  const [employeesList, setEmployeesList] = useState([]);

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = async () => {
    try {
      const employees = await axios.get('http://localhost:5000/api/employees/');
      setEmployeesList(employees.data.getAllEmployees);

      console.log('getAllEmployees():', employees.data.getAllEmployees)
    } catch (err) {
      console.error('getAllEmployees(): ', err);
      res.status(500).send(`Server error: ${err.message}`);
    };
  };

  return (
    <div>
      <header className={cssStyles.container}>
        <div>EMPLOYEES LIST</div>
      </header>

      <div>
        <table>
          <thead>
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

          <tbody>
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
    </div>
  );
};

export default EmployeesList;