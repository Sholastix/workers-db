import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import cssStyles from './EmployeesEditForm.module.css';

const EmployeesEditForm = (props) => {
  const [photo, setPhoto] = useState('');
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

  const getOneEmployee = async () => {
    try {
      const oneEmployee = await axios.get(`http://localhost:5000/api/employees/${id}`);
      const data = oneEmployee.data.getOneEmployee;

      setPhoto(data.photo);
      setFullname(data.fullname);
      setGender(data.gender);
      setBirthday(data.birthday);
      setContacts(data.contacts);
      setPosition(data.position);
      setSalary(data.salary);
      setHired(data.hired);
    } catch (err) {
      console.error(err);
    };
  };

  useEffect(() => {
    getOneEmployee();
  }, []);

  const onSubmit = async (event) => {
    try {
      event.preventDefault();

      // VARIANT 1.
      const formData = new FormData();
      formData.append('photo', photo);
      formData.append('fullname', fullname);
      formData.append('gender', gender);
      formData.append('birthday', birthday);
      formData.append('contacts', contacts);
      formData.append('position', position);
      formData.append('salary', salary);
      formData.append('hired', hired);

      const updatedEmployee = await axios.put(`http://localhost:5000/api/employees/${id}`, formData);

      // // VARIANT 2.
      // const updatedEmployee = await axios.putForm(`http://localhost:5000/api/employees/${id}`, {
      //   photo: photo,
      //   fullname: fullname,
      //   gender: gender,
      //   birthday: birthday,
      //   contacts: contacts,
      //   position: position,
      //   salary: salary,
      //   hired: hired
      // });

      console.log('UPDATED EMPLOYEE: ', updatedEmployee);
    } catch (err) {
      console.error(err);
    };
  };

  // Here we add request and now can reset values not to empty fields but to initial profile's values.
  const onReset = async () => {
    try {
      const oneEmployee = await axios.get(`http://localhost:5000/api/employees/${id}`);
      const data = oneEmployee.data.getOneEmployee;

      setPhoto(data.photo);
      setFullname(data.fullname);
      setGender(data.gender);
      setBirthday(data.birthday);
      setContacts(data.contacts);
      setPosition(data.position);
      setSalary(data.salary);
      setHired(data.hired);
    } catch (err) {
      console.error(err);
    };
  };

  return (
    <div id={cssStyles.container}>
      <p className={cssStyles.title}>UPDATE PROFILE</p>
      <form className={cssStyles.form}>
        <div className={cssStyles.inputOuter}>
          <img className={cssStyles.photo} src={`/photos/${photo}`} alt='NEW PHOTO WILL APPEAR HERE AFTER YOU SUBMIT THE CHANGES!'></img>
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

        <div className={cssStyles.inputOuter}>
          <input
            className={cssStyles.inputInner}
            type='text'
            name='gender'
            value={gender}
            onChange={(event) => { setGender(event.target.value) }}
            placeholder='Gender'
          // required
          />
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
            name='contacts'
            value={contacts}
            onChange={(event) => { setContacts(event.target.value) }}
            placeholder='Contacts'
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

        <div>
          <button type='submit' onClick={onSubmit} className={cssStyles.button}>OK</button>
          <button type='reset' onClick={onReset} className={cssStyles.button}>RESET</button>
        </div>
      </form>
    </div>
  );
};

EmployeesEditForm.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesEditForm);