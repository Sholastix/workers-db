import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import cssStyles from './Signup.module.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmit = async (event) => {
    try {
      event.preventDefault();

      if (password !== confirmPassword) {
        alert('ERROR: Passwords don\'t match!');
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
      <h1>REGISTRATION PAGE</h1>
      <br /><br />
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
          <button type='submit' onClick={onSubmit}>Submit</button>
          <button type='reset' onClick={onReset}>Reset</button>
        </div>
      </form>
      <br />
      <p className={cssStyles.text}>Already have an account? Click here: <Link to='/signin'>SignIn</Link></p>
    </div>
  );
};

export default Signup;