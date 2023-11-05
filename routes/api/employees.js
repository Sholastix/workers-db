const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { Employee } = require('../../models/Employee');
const { authMdw } = require('../../middleware/auth');

// @route: GET /api/employees
// @desc: Get profiles of all employees.
router.get('/employees/', authMdw, async (req, res) => {
  try {
    const getAllEmployees = await Employee.find();

    if (getAllEmployees.length === 0) {
      console.log('MESSAGE: There are no files to display.');
      return res.status(404).json({ errors: [{ msg: 'There are no files to display.' }] });
    };

    console.log('MESSAGE: Profiles of all employees: ', getAllEmployees);
    res.json({ msg: 'Profiles of all employees: ', getAllEmployees });
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

    if (getOneEmployee.length === 0) {
      console.log('MESSAGE: File not found.');
      return res.status(404).json({ errors: [{ msg: 'File not found.' }] });
    };

    console.log('MESSAGE: Profile of specific employee: ', getOneEmployee);
    res.json({ msg: 'Profile of specific employee: ', getOneEmployee });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Server error: ${err.message}`);
  };
});

// @route: POST /api/employees
// @desc: Create new employee's profile.
router.post('/employees/', [
  check('fullname', 'Fullname is required!').notEmpty(),
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

  const { fullname, birthday } = req.body;

  try {
    let newEmployee = await Employee.findOne({ fullname, birthday });

    if (newEmployee) {
      console.log('MESSAGE: Profile for this employee already in DB.');
      return res.status(400).json({ errors: [{ msg: 'Profile for this employee already in DB.' }] });
    };

    newEmployee = await Employee.create(req.body);

    console.log(`MESSAGE: Profile '${newEmployee.fullname}' created successfully!`, newEmployee);
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

    if (!updateEmployee) {
      console.log('FIle not found.');
      return res.status(404).json({ errors: [{ msg: 'File not found.' }] });
    };

    console.log({ msg: `Profile with ID: '${req.params.id}' updated successfully.`, updateEmployee });
    res.json({ msg: `Profile with ID: '${req.params.id}' updated successfully.`, updateEmployee });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Server error: ${err.message}`);
  };
});

// @route: DELETE /api/employees/:id
// @desc: Delete profile of one specific employee.
router.delete('/employees/:id', authMdw, async (req, res) => {
  try {
    // const deleteOneEmployee = await Employee.deleteOne({ _id: req.params.id });
    const deleteOneEmployee = await Employee.deleteOne({ _id: req.params.id });

    // Confirming 'delete from DB' operation's success. Alternatively, we can send "GET" request to the DB again to check if this file still exists.
    if (deleteOneEmployee.deletedCount !== 1) {
      console.log('MESSAGE: Something went wrong! File still is in DB.');
      return res.status(400).json({ errors: [{ msg: 'Something went wrong! File still is in DB.' }] });
    };

    console.log('MESSAGE: Profile successfully deleted from DB.');
    res.json({ msg: 'Profile successfully deleted from DB.' });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Server error: ${err.message}`);
  };
});

module.exports = router;