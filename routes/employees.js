const express = require('express');
const router = express.Router();

router.get('/employees', (req, res) => res.send('Employees route!'));

module.exports = router;