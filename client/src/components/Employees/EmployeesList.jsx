import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import cssStyles from './EmployeesList.module.css';

import Spinner from '../Spinner/Spinner';

import { getAllEmployees, deleteEmployee } from '../../redux/actions/employees';

const EmployeesList = (props) => {
  // Get all profiles of employees.
  useEffect(() => {
    props.getAllEmployees();
  }, []);

  // Redirect to targeted page. 
  // Here we using hook 'useNavigate with <button>, but as alternative we can just use without any hooks this: <Link to='/our-targeted-route'>Edit</Link> as we do with 'employee create form'.
  const navigate = useNavigate();

  return (
    <div id={cssStyles.container}>
      <div className={cssStyles.link}>
        <Link to='/employees-create-form' className={cssStyles.linkCreate}>+ New Profile</Link>
      </div>
      <header className={cssStyles.title}>
        <p>LIST OF EMPLOYEES</p>
      </header>
      {props.loading === false
        ?
        (
          props.employeesList !== undefined && props.employeesList.length > 0
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
                {props.employeesList.map((employee) => (
                  <tr key={employee._id}>
                    {employee.photo === 'undefined'
                      ?
                      <td><img src={`http://localhost:5000/static/photos/default.jpg`} className={cssStyles.photo} /></td>
                      :
                      <td><img src={`http://localhost:5000/static/photos/${employee.photo}`} className={cssStyles.photo} /></td>
                    }
                    <td>{employee.fullname}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.birthday.split('T')[0].split('-').reverse().join('-')}</td>
                    <td>{employee.position}</td>
                    <td>{employee.contacts}</td>
                    <td>{employee.salary}</td>
                    <td>{employee.hired.split('T')[0].split('-').reverse().join('-')}</td>
                    <td>
                      {/* <Link to=`/employees-edit-form/${employee._id}`>Edit</Link> */}
                      <button onClick={() => { navigate(`/employees-edit-form/${employee._id}`) }} className={cssStyles.button}>Edit</button>
                      <button onClick={() => { props.deleteEmployee(employee._id) }} className={cssStyles.button}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            :
            <div className={cssStyles.message}>
              <p>NO PROFILES TO DISPLAY</p>
            </div>
        )
        :
        <Spinner />
      }
    </div>
  );
};

EmployeesList.propTypes = {
  deleteEmployee: PropTypes.func.isRequired,
  employeesList: PropTypes.array,
  getAllEmployees: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

const mapStateToProps = (state) => ({
  employeesList: state.getAllEmployees.employeesList,
  loading: state.getAllEmployees.loading
});

const mapDispatchToProps = {
  deleteEmployee,
  getAllEmployees
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesList);