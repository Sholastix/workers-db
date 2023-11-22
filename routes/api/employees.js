const express = require('express');
const fs = require('fs');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const { Employee } = require('../../models/Employee');
const { authMdw } = require('../../middleware/auth');
const { upload } = require('../../middleware/multer');

// @route: GET /api/employees
// @desc: Get profiles of all employees.
router.get('/employees/', authMdw, async (req, res) => {
  try {
    const getAllEmployees = await Employee.find();

    if (getAllEmployees.length === 0) {
      // This part is intended to clean the 'photos' directory of unnecessary photos.
      fs.readdir('client/public/photos', (err, files) => {
        files.forEach((file) => {
          if (file !== 'default.jpg') {
            fs.unlink(`client/public/photos/${file}`, (err) => {
              if (err) {
                console.error(err);
              };
            });
          };
        });
      });

      // And this message is shown to us when the "employees" collection in the DB is empty.
      console.log('\nMESSAGE: There are no files to display.');
      return res.status(404).json({ msg: 'There are no files to display.' });
    };

    // console.log('\nMESSAGE: Profiles of all employees: ', getAllEmployees);
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
    const getOneEmployee = await Employee.findOne({ _id: req.params.id });

    if (!getOneEmployee) {
      console.log('\nMESSAGE: File not found.');
      return res.status(404).json({ errors: [{ msg: 'File not found.' }] });
    };

    console.log('\nMESSAGE: Profile of specific employee: ', getOneEmployee);
    res.json({ msg: 'Profile of specific employee: ', getOneEmployee });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Server error: ${err.message}`);
  };
});

// @route: POST /api/employees
// @desc: Create new employee's profile ('Multer' middleware already integrated).
router.post('/employees/', authMdw, upload.single('photo'), [
  check('fullname', 'Fullname is required!').notEmpty(),
  check('gender', 'Gender is required!').notEmpty(),
  check('birthday', 'Birthday date is required!').notEmpty(),
  check('contacts', 'Contact info is required!').notEmpty(),
  check('position', 'Position is required!').notEmpty(),
  check('salary', 'Salary is required!').notEmpty(),
  check('hired', 'Date of hire is required!').notEmpty(),
], async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  };

  const { fullname, birthday } = req.body;

  try {
    let newEmployee = await Employee.findOne({ fullname, birthday });

    if (newEmployee) {
      console.log('\nMESSAGE: Profile for this employee already in DB.');
      return res.status(400).json({ errors: [{ msg: 'Profile for this employee already in DB.' }] });
    };

    // Create new employee's profile with photo.
    // VARIANT 1. 
    // This will work if we set default value for 'photo' property in 'Employee' schema. 
    // Default in mongoose schema works only if the value of the corresponding property is strictly 'undefined', so in 'VARIANT 2' default from schema will be ignored.
    if (req.file === undefined) {
      // Presume that we set default in schema, so now we can omit 'photo' property because it will be added in our 'Employee' object automatically.
      newEmployee = await Employee.create(req.body);
    } else {
      newEmployee = await Employee.create({ ...req.body, photo: req.file.filename });
    };

    // // VARIANT 2.
    // // Here we setting default value for 'photo' manually in case we don't have employees photo (and in 'Employee' model we don't set any defaults), but profile must be created right now.
    // const defaultPhoto = 'default.jpg';
    // // Here we declare variable for actual employee's photo.
    // let employeePhoto;
    // // And here we simply checking if app's user downloaded employees photo or not.
    // if (req.file === undefined) {
    //   employeePhoto = defaultPhoto;
    // } else {
    //   employeePhoto = req.file.filename;
    // };

    // newEmployee = await Employee.create({ ...req.body, photo: employeePhoto });

    console.log(`\nMESSAGE: Profile '${newEmployee.fullname}' created successfully!`, newEmployee);
    res.status(201).json({ msg: `Profile '${newEmployee.fullname}' created successfully!`, newEmployee });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Server error: ${err.message}`);
  };
});

// @route: PUT /api/employees/:id
// @desc: Update profile of one specific employee ('Multer' middleware already integrated).
router.put('/employees/:id', authMdw, upload.single('photo'), [
  check('fullname', 'Fullname is required!').notEmpty(),
  check('gender', 'Gender is required!').notEmpty(),
  check('birthday', 'Birthday date is required!').notEmpty(),
  check('contacts', 'Contact info is required!').notEmpty(),
  check('position', 'Position is required!').notEmpty(),
  check('salary', 'Salary is required!').notEmpty(),
  check('hired', 'Date of hire is required!').notEmpty(),
], async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  };

  try {
    let updateEmployee;

    if (req.file === undefined) {
      updateEmployee = await Employee.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    } else {
      updateEmployee = await Employee.findOneAndUpdate({ _id: req.params.id }, { ...req.body, photo: req.file.filename }, { new: true });
    };

    if (!updateEmployee) {
      console.log('\nMESSAGE: File not found.');
      return res.status(404).json({ errors: [{ msg: 'File not found.' }] });
    };

    console.log(`\nProfile with ID: '${req.params.id}' updated successfully.`, updateEmployee);
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
    const getOneEmployee = await Employee.findOne({ _id: req.params.id });

    if (!getOneEmployee) {
      console.log('\nMESSAGE: File not found.');
      return res.status(404).json({ errors: [{ msg: 'File not found.' }] });
    };

    // Remove employee photo from FS (except 'default.jpg' as it may be needed for other profiles).
    if (getOneEmployee.photo) {
      fs.readdir('client/public/photos', (err, files) => {
        files.forEach((file) => {
          if (file === getOneEmployee.photo && file !== 'default.jpg') {
            fs.unlink(`client/public/photos/${getOneEmployee.photo}`, (err) => {
              if (err) {
                console.error(err);
              };

              // console.log(`\nMESSAGE: Photo '${file}' successfully deleted from FS.`);
              // res.json(`File '${file}' successfully deleted from FS.`); // response for "POSTMAN". 
            });
          };
        });
      });
    } else {
      console.log('Photo not found!');
      // res.json('Photo not found!'); // response for "POSTMAN". 
    };

    // Deleting employee's profile from DB.
    const deleteOneEmployee = await Employee.deleteOne(
      { _id: req.params.id },
    );

    // Confirming 'delete from DB' operation's success. Alternatively, we can send "GET" request to the DB again to check if this file still exists.
    if (deleteOneEmployee.deletedCount !== 1) {
      console.log(`\nMESSAGE: Something went wrong! Profile '${getOneEmployee.fullname}' still is in DB.`);
      return res.status(400).json({ errors: [{ msg: `Something went wrong! Profile '${getOneEmployee.fullname}' still is in DB.` }] });
    };

    console.log(`\nMESSAGE: Profile '${getOneEmployee.fullname}' successfully deleted from DB.`);
    res.json({ msg: `Profile '${getOneEmployee.fullname}' successfully deleted from DB.` });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Server error: ${err.message}`);
  };
});

module.exports = router;