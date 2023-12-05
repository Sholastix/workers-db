import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import cssStyles from './EmployeesEditForm.module.css';

import { employeeGender } from '../../constants/employeeGender';
import { getOneEmployee, updateEmployee } from '../../redux/actions/employees';

const EmployeesEditForm = (props) => {
  const [photo, setPhoto] = useState();
  const [fullname, setFullname] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [contacts, setContacts] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [hired, setHired] = useState('');

  // We need this for dynamic change of 'type' value for some inputs.
  const [birthdayInputType, setBirthdayInputType] = useState('text');
  const [hiredInputType, setHiredInputType] = useState('text');

  // Here we get the ID of the current user from request parameters (basically from http request address) with help of hook 'useParams()'.
  const { id } = useParams();

  // VARIANT 1: with REDUX.
  // That's kinda tricky, because we can't set the 'value' property for <input type='file'/> element programmatically, only by user's action, so we always will get a warning "A component is changing a controlled input to be uncontrolled" in console.
  // Maybe later we find some way to workaround that problem (trick with 'DataTransfer' and 'files' attribute or we can wrap 'input' inside another Component, which we can then use as controlled one).
  useEffect(() => {
    props.getOneEmployee(id);
  }, []);

  useEffect(() => {
    setInitialValues();
  }, [props.employee]);

  const setInitialValues = () => {
    try {
      setPhoto(props.employee.photo);
      setFullname(props.employee.fullname);
      setGender(props.employee.gender);
      setBirthday(props.employee.birthday);
      setContacts(props.employee.contacts);
      setPosition(props.employee.position);
      setSalary(props.employee.salary);
      setHired(props.employee.hired);
    } catch (err) {
      console.error(err);
    };
  };

  // // Get initial employee's profile data.
  // // VARIANT 2: without REDUX. It works without "A component is changing a controlled input to be uncontrolled" warning.
  // useEffect(() => {
  //   getOneEmployee();
  // }, []);

  // const getOneEmployee = async () => {
  //   try {
  //     const oneEmployee = await axios.get(`http://localhost:5000/api/employees/${id}`);
  //     const data = oneEmployee.data.getOneEmployee;

  //     setPhoto(data.photo);
  //     setFullname(data.fullname);
  //     setGender(data.gender);
  //     setBirthday(data.birthday);
  //     setContacts(data.contacts);
  //     setPosition(data.position);
  //     setSalary(data.salary);
  //     setHired(data.hired);
  //   } catch (err) {
  //     console.error(err);
  //   };
  // };

  // Hook for redirect after form submitted.
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    try {
      event.preventDefault();

      props.updateEmployee(id, { photo, fullname, gender, birthday, contacts, position, salary, hired });

      // Redirect to 'EmployeesList' page.
      if (fullname === '' || gender === '' || birthday === '' || contacts === '' || position === '' || salary === '' || hired === '') {
        return;
      } else {
        navigate('/employees-list');
      };
    } catch (err) {
      console.error(err);
    };
  };

  // Reset form values to initial profile's values.
  // VARIANT 1: with REDUX.
  const onReset = async () => {
    try {
      setPhoto(props.employee.photo);
      setFullname(props.employee.fullname);
      setGender(props.employee.gender);
      setBirthday(props.employee.birthday);
      setContacts(props.employee.contacts);
      setPosition(props.employee.position);
      setSalary(props.employee.salary);
      setHired(props.employee.hired);
    } catch (err) {
      console.error(err);
    };
  };

  // // VARIANT 2: without REDUX.
  // const onReset = async () => {
  //   try {
  //     const oneEmployee = await axios.get(`http://localhost:5000/api/employees/${id}`);
  //     const data = oneEmployee.data.getOneEmployee;

  //     setPhoto(data.photo);
  //     setFullname(data.fullname);
  //     setGender(data.gender);
  //     setBirthday(data.birthday);
  //     setContacts(data.contacts);
  //     setPosition(data.position);
  //     setSalary(data.salary);
  //     setHired(data.hired);
  //   } catch (err) {
  //     console.error(err);
  //   };
  // };

  return (
    <div id={cssStyles.container}>
      <p className={cssStyles.title}>UPDATE PROFILE</p>
      {props.loading === false
        ?
        <form className={cssStyles.form}>
          <div className={cssStyles.inputOuter}>
            <img className={cssStyles.photo} src={`http://localhost:5000/static/photos/${photo}`} alt='NEW PHOTO WILL APPEAR HERE AFTER YOU SUBMIT THE CHANGES!'></img>
            <br />
            <input
              className={cssStyles.inputInnerPhoto}
              type='file'
              name='photo'
              onChange={(event) => { setPhoto(event.target.files[0]) }}
            // required
            />
          </div>

          <div className={cssStyles.inputOuter}>
            <input
              className={cssStyles.inputInner}
              type='text'
              name='fullname'
              value={fullname}
              onChange={(event) => { setFullname(event.target.value) }}
              placeholder='Fullname'
            // required
            />
          </div>

          <div className={cssStyles.selectOuter}>
            <select
              className={cssStyles.selectInner}
              name='gender'
              value={gender}
              onChange={(event) => { setGender(event.target.value) }}
              placeholder='Gender'
            // required
            >
              <option>{gender}</option>
              {
                employeeGender.map((gender, index) => {
                  return <option key={index}>{gender}</option>
                })
              }
            </select>
          </div>

          <div className={cssStyles.inputOuter}>
            <input
              className={cssStyles.inputInner}
              type={birthdayInputType}
              name='birthday'
              value={birthday}
              onFocus={() => { setBirthdayInputType('date') }}
              onBlur={() => { setBirthdayInputType('text') }}
              onChange={(event) => { setBirthday(event.target.value) }}
              placeholder='Birthday'
            // required
            />
          </div>

          <div className={cssStyles.inputOuter}>
            <input
              className={cssStyles.inputInner}
              type='text'
              name='position'
              value={position}
              onChange={(event) => { setPosition(event.target.value) }}
              placeholder='Position'
            // required
            />
          </div>

          <div className={cssStyles.inputOuter}>
            <input
              className={cssStyles.inputInner}
              type='number'
              name='salary'
              value={salary}
              onChange={(event) => { setSalary(event.target.value) }}
              placeholder='Salary'
            // required
            />
          </div>

          <div className={cssStyles.inputOuter}>
            <input
              className={cssStyles.inputInner}
              type={hiredInputType}
              name='hired'
              value={hired}
              onFocus={() => { setHiredInputType('date') }}
              onBlur={() => { setHiredInputType('text') }}
              onChange={(event) => { setHired(event.target.value) }}
              placeholder='Hired'
            // required
            />
          </div>

          <div className={cssStyles.textareaOuter}>
            <textarea
              className={cssStyles.textareaInner}
              type='text'
              name='contacts'
              value={contacts}
              onChange={(event) => { setContacts(event.target.value) }}
              placeholder='Contacts'
            // required
            />
          </div>
          <div>
            <button type='submit' onClick={onSubmit} className={cssStyles.button}>OK</button>
            <button type='reset' onClick={onReset} className={cssStyles.button}>RESET</button>
          </div>
        </form>
        :
        <p>LOADING...</p>
      }
    </div>
  );
};

EmployeesEditForm.propTypes = {
  getOneEmployee: PropTypes.func.isRequired,
  updateEmployee: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

const mapStateToProps = (state) => ({
  employee: state.getOneEmployee.employee,
  loading: state.getOneEmployee.loading
});

const mapDispatchToProps = {
  getOneEmployee,
  updateEmployee
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesEditForm);