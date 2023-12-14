import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import cssStyles from './EmployeesList.module.css';

import Spinner from '../Spinner/Spinner';

import { getAllEmployees, deleteEmployee } from '../../redux/actions/employees';

const EmployeesList = (props) => {
  const [filter, setFilter] = useState('');
  const [filteredInfo, setFilteredInfo] = useState([]);

  // VARIANT 1: multiple accordions can be open at once.
  const [arr, setArr] = useState([]);

  // // VARIANT 2: only one accordion can be opened at once.
  // const [openId, setOpenId] = useState(null);

  // Get all profiles of employees.
  useEffect(() => {
    props.getAllEmployees();
  }, []);

  // Employee profiles list filtering.
  useEffect(() => {
    filteredEmployees();
  }, [filter]);

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

  // EMPLOYEE PROFILES FILTERING.
  // Handling changes in the filter input field.
  const handleFilter = (event) => {
    try {
      // Changing filter input value from default to user's value.
      const filterText = event.target.value;
      filterText.length > 0 ? setFilter(filterText) : setFilter('');
    } catch (error) {
      console.error(error);
    };
  };

  // Function that filtering employee profiles list accordingly to user's request.
  const filteredEmployees = () => {
    const filteredEmployeesList = [];
    // Creating regular expression for dynamic input data from user.
    const regExp = new RegExp(`${filter}`, 'gi');

    props.employeesList.map((employee) => {
      // Only profiles that match the user's request are displayed in UI.
      employee.fullname.match(regExp) && filteredEmployeesList.push(employee);
    });

    setFilteredInfo(filteredEmployeesList);
  };

  // Here we automatically sorting employee profiles list by fullname (from Aa to Zz).
  const sortedEmployeesList = props.employeesList.sort((a, b) => {
    if (a.fullname > b.fullname) {
      return 1;
    };

    if (a.fullname < b.fullname) {
      return -1;
    };
    // If fullnames equal.
    return 0;
  });

  let listOfProfiles;
  // If we don't write anything in filter input, then UI will display full list of employees from DB.
  filter.length > 0 ? listOfProfiles = filteredInfo : listOfProfiles = sortedEmployeesList;

  return (
    <div id={cssStyles.container}>
      <div className={cssStyles.link}>
        <Link to='/employees-create-form' className={cssStyles.linkCreate}>+ New Profile</Link>
      </div>
      <header className={cssStyles.title}>
        <p>LIST OF EMPLOYEES</p>
      </header>
      <input
        className={cssStyles.filter}
        type='text'
        name='filter'
        onChange={handleFilter}
        placeholder='Search employee by name...'
      />
      {
        props.loading === false
          ?
          (
            props.employeesList !== undefined && props.employeesList.length > 0
              ?
              <div>
                {/* String below will do if we dont need filtering. */}
                {/* {props.employeesList.map((employee) => ( */}
                {listOfProfiles.map((employee) => (
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