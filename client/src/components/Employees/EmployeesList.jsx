import React, { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import cssStyles from './EmployeesList.module.css';

import Spinner from '../Spinner/Spinner';

import { getAllEmployees, deleteEmployee } from '../../redux/actions/employees';

const EmployeesList = (props) => {
  // VARIANT 1: multiple accordions can be open at once.
  const [arr, setArr] = useState([]);

  // // VARIANT 2: only one accordion can be opened at once.
  // const [openId, setOpenId] = useState(null);

  // Get all profiles of employees.
  useEffect(() => {
    props.getAllEmployees();
  }, []);

  // Redirect to targeted page. 
  // Here we using hook 'useNavigate with <button>, but as alternative we can just use without any hooks this: <Link to='/our-targeted-route'>Edit</Link> as we do with 'employee create form'.
  const navigate = useNavigate();

  // VARIANT 1 of accordion handler (multiple).
  const newArr = [...arr];

  const accordionHandler = (id) => {
    if (arr.includes(id) === false) {
      newArr.push(id);
      setArr(newArr);
    } else {
      const index = newArr.indexOf(id);
      newArr.splice(index, 1);
      setArr(newArr);
    };
  };

  // // VARIANT 2 of accordion handler (single).
  // const accordionHandler = (id) => {
  //   if (id !== openId) {
  //     setOpenId(id);
  //   } else {
  //     setOpenId(null);
  //   };
  // };

  return (
    <div id={cssStyles.container}>
      <div className={cssStyles.link}>
        <Link to='/employees-create-form' className={cssStyles.linkCreate}>+ New Profile</Link>
      </div>
      <header className={cssStyles.title}>
        <p>LIST OF EMPLOYEES</p>
      </header>
      {
        props.loading === false
          ?
          (
            props.employeesList !== undefined && props.employeesList.length > 0
              ?
              <div>
                {props.employeesList.map((employee) => (
                  <div key={employee._id}>
                    <button className={cssStyles.accordion} onClick={() => accordionHandler(employee._id)}>{employee.fullname}</button>
                    {/* VARIANT 1: multiple */}
                    <div className={arr.includes(employee._id) ? cssStyles.accordionPanelOpen : cssStyles.accordionPanelClosed}>
                    {/* VARIANT 2: single */}
                    {/* <div className={employee._id === openId ? cssStyles.accordionPanelOpen : cssStyles.accordionPanelClosed}> */}
                      <div className={cssStyles.accordionPanelOpenHeader}>
                        <div>
                          {
                            employee.photo === 'undefined'
                              ?
                              <img src={`http://localhost:5000/static/photos/default.jpg`} className={cssStyles.photo} alt={'PHOTO'} />
                              :
                              <img src={`http://localhost:5000/static/photos/${employee.photo}`} className={cssStyles.photo} alt={'PHOTO'} />
                          }
                        </div>
                        <div className={cssStyles.text}>
                          <p>Gender:&nbsp;&nbsp;&nbsp;&nbsp;<strong>{employee.gender}</strong></p>
                          <p>Birthday:&nbsp;&nbsp;<strong>{employee.birthday.split('T')[0].split('-').reverse().join('-')}</strong></p>
                          <p>Position:&nbsp;&nbsp;&nbsp;<strong>{employee.position}</strong></p>
                          <p>Salary:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>{employee.salary}</strong></p>
                          <p>Hired:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>{employee.hired.split('T')[0].split('-').reverse().join('-')}</strong> </p>
                          <p>Contacts:&nbsp;&nbsp;<strong>{employee.contacts}</strong></p>
                        </div>
                      </div>
                      <div className={cssStyles.accordionPanelOpenFooter}>
                        <button onClick={() => { navigate(`/employees-edit-form/${employee._id}`) }} className={cssStyles.button}>EDIT</button>
                        <button onClick={() => { props.deleteEmployee(employee._id) }} className={cssStyles.button}>DELETE</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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