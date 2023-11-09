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
  
  // Redirect if user signed in.
  if (props.isAuthenticated) {
    return <Navigate to='/employees-list' replace={true} />
  };

  return (
    <div id={cssStyles.container}>
      <p className={cssStyles.title}>AUTH PAGE</p>
      <form>
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
          <button type='submit' onClick={onSubmit} className={cssStyles.button}>Submit</button>
        </div>
      </form>
      <br />
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