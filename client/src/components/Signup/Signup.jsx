import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import cssStyles from './Signup.module.css';

import { setAlert } from '../../redux/actions/alert';
import { signup } from '../../redux/actions/auth';

const Signup = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmit = async (event) => {
    try {
      event.preventDefault();

      if (password !== confirmPassword) {
        // From here we pass 'ERROR: Passwords don\'t match!' part as 'msg' argument and 'failure' part as 'alertType' argument in 'alert' action.
        return props.setAlert('ERROR: Passwords don\'t match!', 'failure');
      };

      props.signup({ username, email, password });

      // This alert message is TEMPORARY, for test use. Later we set auto-redirect to 'employees' page.
      if (username !== '' && email !== '' && password !== '') {
        props.setAlert(`Profile '${username}' created successfully!`, 'success');
      };
    } catch (err) {
      console.error(err);
    };
  };

  const onReset = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div id={cssStyles.container}>
      <p className={cssStyles.title}>REGISTRATION PAGE</p>
      <form>
        <div>
          <input
            type='text'
            name='username'
            value={username}
            onChange={(event) => { setUsername(event.target.value) }}
            placeholder='Username'
          // required
          />
        </div>
        <br />
        <div>
          <input
            type='email'
            name='email'
            value={email}
            onChange={(event) => { setEmail(event.target.value) }}
            placeholder='Email'
          // required
          />
        </div>
        <br />
        <div>
          <input
            type='password'
            name='password'
            value={password}
            onChange={(event) => { setPassword(event.target.value) }}
            placeholder='Password'
          // required
          />
        </div>
        <br />
        <div>
          <input
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={(event) => { setConfirmPassword(event.target.value) }}
            placeholder='Confirm your password'
          // required
          />
        </div>
        <br />
        <div>
          <button type='submit' onClick={onSubmit} className={cssStyles.button}>Submit</button>
          <button type='reset' onClick={onReset} className={cssStyles.button}>Reset</button>
        </div>
      </form>
      <br />
      <p className={cssStyles.text}>Already have an account? <Link to='/signin' className={cssStyles.link}>SignIn</Link></p>
    </div>
  );
};

Signup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setAlert,
  signup
};

// 'connect()' function connects a React component to a Redux store.
export default connect(null, mapDispatchToProps)(Signup);