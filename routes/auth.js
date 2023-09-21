const express = require('express');
const router = express.Router();
const { authMdw } = require('../middleware/auth');
const { User } = require('../models/User');

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

module.exports = router;