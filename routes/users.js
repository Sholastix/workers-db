const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const { User } = require('../models/User');

// REGISTRATION OF THE NEW USER.
router.post('/users', [
  check('username', 'Username is required and must be 3 or more characters!').notEmpty().isLength({ min: 3 }),
  check('email', 'Please set the valid email!').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
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

    // Encrypt user's password with npm 'bcrypt'.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user and save it into DB.
    user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      console.log(user);
      res.status(201).json({ msg: 'Registration completed successfully!', user });
    };

    // Step 2 (optional): get user's image from his mail service with help of npm 'gravatar'.
    // Step 4: return jsonwebtoken.
  } catch (err) {
    console.error(err);
    res.status(500).send(`Server error: ${err.message}`);
  };
});

module.exports = router;