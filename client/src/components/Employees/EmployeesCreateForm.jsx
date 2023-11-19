import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import cssStyles from './EmployeesCreateForm.module.css';

const EmployeesCreateForm = (props) => {
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

  const onSubmit = async (event) => {
    try {
      event.preventDefault();

    } catch (err) {
      console.error(err);
    };
  };

  const onReset = () => {
    setPhoto('');
    setFullname('');
    setGender('');
    setBirthday('');
    setContacts('');
    setPosition('');
    setSalary('');
    setHired('');
  };

  return (
    <div id={cssStyles.container}>
      <p className={cssStyles.title}>NEW PROFILE</p>
      <form className={cssStyles.form} encType="multipart/form-data">
        <div className={cssStyles.inputOuter}>
          <input
            className={cssStyles.inputInnerPhoto}
            type='file'
            name='photo'
            value={photo}
            onChange={(event) => { setPhoto(event.target.value) }}
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

EmployeesCreateForm.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesCreateForm);