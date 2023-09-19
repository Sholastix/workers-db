const express = require('express');
const router = express.Router();
const { authMdw } = require('../middleware/auth');

router.get('/employees', authMdw, (req, res) => res.send('Employees route!'));

module.exports = router;