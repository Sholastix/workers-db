import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import cssStyles from './Signin.module.css';

import { signin } from '../../redux/actions/auth';

const Signin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (event) => {
    try {
      event.preventDefault();

      props.signin({ email, password });
    } catch (err) {
      console.error(err);
    };
  };

  const onReset = () => {
    setEmail('');
    setPassword('');
  };

  // Redirect if user signed in.
  if (props.isAuthenticated) {
    return <Navigate to='/employees-list' replace={true} />
  };

  return (
    <div id={cssStyles.container}>
      <p className={cssStyles.title}>AUTHENTICATION</p>
      <form className={cssStyles.form}>
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

        <div>
          <button type='submit' onClick={onSubmit} className={cssStyles.button}>OK</button>
          <button type='reset' onClick={onReset} className={cssStyles.button}>RESET</button>
        </div>
      </form>
      <p className={cssStyles.text}>Don't have an account? <Link to='/signup' className={cssStyles.link}>SignUp</Link></p>
    </div>
  );
};

Signin.propTypes = {
  signin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
  signin
};

// 'connect()' function connects a React component to a Redux store.
export default connect(mapStateToProps, mapDispatchToProps)(Signin);