import React, { useState, useEffect } from 'react';
import axios from 'axios';

import cssStyles from './Signup.module.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // // VARIANT 2.
  // const [formData, setFormData] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  //   confirmPassword: ''
  // });

  // const { username, email, password, confirmPassword } = formData;

  // const onChange = (event) => {
  //   // Here we use event's target as a key.
  //   setFormData({ ...formData, [event.target.name]: event.target.value });
  // };

  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('ERROR: Passwords don\'t match!');
      return;
    };

    console.log({ username, email, password });
  };

  const onReset = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div id={cssStyles.container}>
      <h1>REGISTRATION PAGE</h1>
      <br /><br />
      <form>
        <div>
          <input
            type='text'
            name='username'
            value={username}
            onChange={(event) => { setUsername(event.target.value) }}
            // onChange={(event) => { onChange(event) }} // For VARIANT 2.
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
            // onChange={(event) => { onChange(event) }} // For VARIANT 2.
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
            // onChange={(event) => { onChange(event) }} // For VARIANT 2.
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
            // onChange={(event) => { onChange(event) }} // For VARIANT 2.
            placeholder='Confirm your password'
            required
          />
        </div>
        <br />
        <div>
          <button type='submit' onClick={onSubmit}>Submit</button>
          <button type='reset' onClick={onReset}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;