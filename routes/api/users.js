const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const { User } = require('../../models/User');
const { authMdw } = require('../../middleware/auth');

// @route: GET /api/users
// @desc: Get profiles of all users.
router.get('/users', authMdw, async (req, res) => {
  try {
    // '-password' means that we return all user's info except password.
    const getAllUsers = await User.find().select('-password');

    console.log('MESSAGE: Profiles of all users: ', getAllUsers);
    res.json({ msg: 'Profiles of all users: ', getAllUsers });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.');
  };
});

// @route: POST /api/users
// @desc: Register new user.
router.post('/users', [
  check('username', 'Username is required and must be 3 or more characters!').notEmpty().isLength({ min: 3 }),
  check('email', 'Please set the valid email!').isEmail(),
  check('password', 'Password must be 6 or more characters!').isLength({ min: 6 })
], async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  };

  const { username, email, password } = req.body;

  try {
    // Check if the new user's registration email adress already exists in DB.
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User with this email already exists.' }] });
    };

    // OPTIONAL: get user's image from his mail service with help of npm 'gravatar' or maybe just use 'multer' or something similar for users and employees photo.

    // Encrypt user's password with npm 'bcrypt'.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user and save it into DB.
    user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Create jsonwebtoken for user.
    const jwtPayload = {
      user: {
        id: user._id,
      }
    };

    const jwtSecret = process.env.JWT_SECRET;
    const jwtLifespan = '10h';

    jwt.sign(jwtPayload, jwtSecret, { expiresIn: jwtLifespan, algorithm: 'HS256' }, (err, token) => {
      if (err) {
        throw err;
      } else {
        console.log({ newUser: user, signedToken: token, expiresIn: jwtLifespan });
        res.status(201).json({ msg: 'Registration completed successfully!', user, signedToken: token, expiresIn: jwtLifespan });
      };
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Server error: ${err.message}`);
  };
});

module.exports = router;