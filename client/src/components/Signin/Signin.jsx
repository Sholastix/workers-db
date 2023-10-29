import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import cssStyles from './Signin.module.css';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (event) => {
    try {
      event.preventDefault();

      const newUser = await axios.post('http://localhost:5000/api/auth', {
        email,
        password
      });

      console.log({ newUser });
      // console.log({ 'TOKEN: ': newUser.data.signedToken }); // get the token.
    } catch (err) {
      console.error(err);
    };
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
          <button type='submit' onClick={onSubmit} className={cssStyles.button}>Submit</button>
        </div>
      </form>
      <br />
      <p className={cssStyles.text}>Don't have an account? Click here: <Link to='/signup' className={cssStyles.link}>SignUp</Link></p>
    </div>
  );
};

export default Signin;