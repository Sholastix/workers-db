const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const { User } = require('../models/User');
const { authMdw } = require('../middleware/auth');

// USER'S AUTHORIZATION. 
router.get('/auth', authMdw, async (req, res) => {
  try {
    // '-password' means that we return all user's info except password. 
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  };
});

// USERS AUTHENTICATION AND TOKENS DISTRIBUTION.
router.post('/auth', [
  check('email', 'Please set the valid email!').isEmail(),
  check('password', 'Password is required!').exists(),
], async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  };

  const { email, password } = req.body;

  try {
    // Check if the new user's registration email adress already exists in DB.
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not found.' }] });
    };

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ errors: [{ msg: 'Password does not match.' }] });
    };

    // Create jsonwebtoken for user.
    const jwtPayload = {
      user: {
        id: user._id,
      }
    };

    const jwtSecret = process.env.JWT_SECRET;
    const jwtLifespan = '10h';
    const token = jwt.sign(jwtPayload, jwtSecret, { expiresIn: jwtLifespan, algorithm: 'HS256' });
    res.json({ signedToken: token, expiresIn: jwtLifespan });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Server error: ${err.message}`);
  };
});

module.exports = router;