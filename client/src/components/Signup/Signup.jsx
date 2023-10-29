import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

import cssStyles from './Signup.module.css';

import { setAlert } from '../../redux/actions/alert';

const Signup = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmit = async (event) => {
    try {
      event.preventDefault();

      if (password !== confirmPassword) {
        // From here we pass 'ERROR: Passwords don\'t match!' part as 'msg' argument and 'danger' part as 'alertType' argument in 'alert' action.
        props.setAlert('ERROR: Passwords don\'t match!', 'danger');
        return;
      };

      /////////////// Later, this part will be relocated in Redux. START. ///////////////
      const newUser = await axios.post('http://localhost:5000/api/users', {
        username,
        email,
        password
      });

      console.log({ newUser });
      console.log({ 'TOKEN: ': newUser.data.signedToken }); // get the token.
      props.setAlert(`Profile '${newUser.data.user.username}' created successfully!`, 'success');
      /////////////// Later, this part will be relocated in Redux. END. ///////////////
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
            required
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
            required
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
            required
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
            required
          />
        </div>
        <br />
        <div>
          <button type='submit' onClick={onSubmit} className={cssStyles.button}>Submit</button>
          <button type='reset' onClick={onReset} className={cssStyles.button}>Reset</button>
        </div>
      </form>
      <br />
      <p className={cssStyles.text}>Already have an account? Click here: <Link to='/signin' className={cssStyles.link}>SignIn</Link></p>
    </div>
  );
};

Signup.propTypes = {
  setAlert: PropTypes.func.isRequired
};

// 'connect()' function connects a React component to a Redux store.
// { setAlert } as argument in 'connect()' allowes us to access props.setAlert which comes in 'Signup()' function.
export default connect(null, { setAlert })(Signup);