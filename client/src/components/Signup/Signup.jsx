import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
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

  // Redirect if user signed up.
  if (props.isAuthenticated) {
    return <Navigate to='/employees-list' replace={true} />
  };

  return (
    <div id={cssStyles.container}>
      <p className={cssStyles.title}>REGISTRATION</p>
      <form className={cssStyles.form}>
        <div className={cssStyles.inputOuter}>
          <input
            className={cssStyles.inputInner}
            type='text'
            name='username'
            value={username}
            onChange={(event) => { setUsername(event.target.value) }}
            placeholder='Username'
          // required
          />
        </div>

        <div className={cssStyles.inputOuter}>
          <input
            className={cssStyles.inputInner}
            type='email'
            name='email'
            value={email}
            onChange={(event) => { setEmail(event.target.value) }}
            placeholder='Email'
          // required
          />
        </div>

        <div className={cssStyles.inputOuter}>
          <input
            className={cssStyles.inputInner}
            type='password'
            name='password'
            value={password}
            onChange={(event) => { setPassword(event.target.value) }}
            placeholder='Password'
          // required
          />
        </div>

        <div className={cssStyles.inputOuter}>
          <input
            className={cssStyles.inputInner}
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={(event) => { setConfirmPassword(event.target.value) }}
            placeholder='Confirm your password'
          // required
          />
        </div>

        <div>
          <button type='submit' onClick={onSubmit} className={cssStyles.button}>OK</button>
          <button type='reset' onClick={onReset} className={cssStyles.button}>RESET</button>
        </div>
      </form>
      <p className={cssStyles.text}>Already have an account? <Link to='/signin' className={cssStyles.link}>SignIn</Link></p>
    </div>
  );
};

Signup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
  setAlert,
  signup
};

// 'connect()' function connects a React component to a Redux store.
export default connect(mapStateToProps, mapDispatchToProps)(Signup);