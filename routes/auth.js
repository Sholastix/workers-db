const express = require('express');
const router = express.Router();
const { authMdw } = require('../middleware/auth');
const { User } = require('../models/User');

router.get('/auth', authMdw, (req, res) => res.send('Auth route!'));

module.exports = router;