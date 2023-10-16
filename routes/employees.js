const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { Employee } = require('../models/Employee');
const { authMdw } = require('../middleware/auth');

// @route: GET /api/employees
// @desc: Get profiles of all employees.
router.get('/employees/', authMdw, async (req, res) => {
  try {
    const getAllEmployees = await Employee.find();
    res.json(getAllEmployees);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Server error: ${err.message}`);
  };
});

// @route: GET /api/employees/:id
// @desc: Get profile of one specific employee.
router.get('/employees/:id', authMdw, async (req, res) => {
  try {
    const getOneEmployee = await Employee.find({ _id: req.params.id });
    res.json(getOneEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Server error: ${err.message}`);
  };
});

// @route: POST /api/employees
// @desc: Create new employee's profile.
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

// @route: PUT /api/employees/:id
// @desc: Update profile of one specific employee.
router.put('/employees/:id', authMdw, async (req, res) => {
  try {
    const updateEmployee = await Employee.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.json({ msg: 'Profile updated successfully.', updateEmployee });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Server error: ${err.message}`);
  };
});

// @route: DELETE /api/employees/:id
// @desc: Delete profile of one specific employee.
router.delete('/employees/:id', authMdw, async (req, res) => {
  try {
    const deleteOneEmployee = await Employee.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Profile deleted successfully.', deleteOneEmployee });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Server error: ${err.message}`);
  };
});

module.exports = router;