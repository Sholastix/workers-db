const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const { User } = require('../../models/User');
const { authMdw } = require('../../middleware/auth');

// @route: GET /api/auth
// @desc: Route to check user's auth.
router.get('/auth/', authMdw, async (req, res) => {
  try {
    // Here we get user's ID not from params, but from this user's webtoken (which comes from authMdw middleware).
    const user = await User.findById(req.user.id).select('-password');

    console.log('\nCURRENT AUTH USER: ', user);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Server error: ${err.message}`);
  };
});

// @route: POST /api/auth
// @desc: User's authentication & tokens distribution.
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

    console.log({ signedToken: token, expiresIn: jwtLifespan });
    res.json({ signedToken: token, expiresIn: jwtLifespan });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Server error: ${err.message}`);
  };
});

module.exports = router;