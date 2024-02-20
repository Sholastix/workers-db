import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import cssStyles from './EmployeesCreateForm.module.css';

import { employeeGender } from '../../constants/employeeGender';
import { createEmployee } from '../../redux/actions/employees';

const EmployeesCreateForm = (props) => {
  // Here we leave initial state for 'photo' 'undefined' cause we want to use default value for 'photo' from our 'Employee' model (and it will work only with 'undefined').
  const [photo, setPhoto] = useState();
  const [previewPhoto, setPreviewPhoto] = useState();
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

  // LOGIC FOR PHOTO PREVIEW.
  // Creating a preview as a side effect whenever selected file is changed.
  useEffect(() => {
    if (!photo) {
      setPreviewPhoto(undefined);
      return;
    };

    const objectUrl = URL.createObjectURL(photo);
    setPreviewPhoto(objectUrl);

    // Freeing memory whenever this component is unmounted.
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  // Event listener for file selection.
  const onSelectFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setPhoto(undefined);
      return;
    };

    setPhoto(event.target.files[0]);
  };

  // Redirect after form submitted.
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    try {
      event.preventDefault();

      props.createEmployee({ photo, fullname, gender, birthday, contacts, position, salary, hired });

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

  const onReset = () => {
    setPhoto();
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
      <form className={cssStyles.form}>
        <div className={cssStyles.inputOuter}>
          {photo
            ?
            <img src={previewPhoto} className={cssStyles.photo} />
            :
            <img className={cssStyles.photo} src={`/static/photos/default.jpg`} alt='DEFAULT PHOTO'></img>
          }
          <br />
          <input
            className={cssStyles.inputInnerPhoto}
            type='file'
            name='photo'
            onChange={onSelectFile}
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
            <option>Gender</option>
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
    </div>
  );
};

EmployeesCreateForm.propTypes = {
  createEmployee: PropTypes.func.isRequired
};

const mapStateToProps = null;

const mapDispatchToProps = {
  createEmployee
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesCreateForm);