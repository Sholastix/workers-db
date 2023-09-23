const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { Employee } = require('../models/Employee');
const { authMdw } = require('../middleware/auth');

// GET ALL EMPLOYEES.
router.get('/employees/', authMdw, async (req, res) => {
  try {
    const employeesAll = await Employee.find();
    res.json(employeesAll);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Server error: ${err.message}`);
  };
});

// GET ONE SPECIFIC EMPLOYEE.
router.get('/employees/:id', authMdw, async (req, res) => {
  try {
    const employeeOne = await Employee.find({ _id: req.body.id });
    res.json(employeeOne);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Server error: ${err.message}`);
  };
});

// CREATE NEW EMPLOYEE.
router.post('/employees/', [
  check('name', 'Name is required!').notEmpty(),
  check('surname', 'Surname is required!').notEmpty(),
  check('gender', 'Gender is required!').notEmpty(),
  check('birthday', 'Birthday date is required!').notEmpty(),
  check('contacts', 'Contact info is required!').notEmpty(),
  check('position', 'Position is required!').notEmpty(),
  check('salary', 'Salary is required!').notEmpty(),
  check('hired', 'Date of hire is required!').notEmpty(),
], authMdw, async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  };

  const { name, surname, birthday } = req.body;

  try {
    let newEmployee = await Employee.findOne({ name, surname, birthday });

    if (newEmployee) {
      return res.status(400).json({ errors: [{ msg: 'Profile already in DB.' }] });
    };

    newEmployee = await Employee.create(req.body);

    res.status(201).json({ msg: 'Profile created successfully!', newEmployee });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Server error: ${err.message}`);
  };
});

// UPDATE INFO ABOUT SPECIFIC EMPLOYEE.
router.put('/employees/:id', async (req, res) => res.send('UPDATE EMPLOYEE\'S INFO.'));

// DELETE SPECIFIC EMPLOYEE'S PROFILE.
router.delete('/employees/:id', async (req, res) => res.send('DELETE EMPLOYEE.'));


module.exports = router;