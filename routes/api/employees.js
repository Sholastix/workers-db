const express = require('express');
const multer = require('multer');
const path = require('path');
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

////////////////// MULTER MIDDLEWARE START //////////////////

// Path to employee photos.
// const dir = './public/photos'; // on server
const dir = '../workers-db-server/client/public/photos'; // on client

// Here we configuring the storage and naming settings.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the storage path.
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Name of each uploaded file must be unique in our fs/db, but we also want to preserve intact file's original name and extension. 
    const parts = file.originalname.split('.');
    cb(null, parts[0] + '_' + Date.now() + '.' + parts[1]);
  }
});

const upload = multer({
  storage: storage,
  // File filter's config.
  fileFilter: (req, file, cb) => {
    // Create RegExp for allowed filetypes.
    const allowedFiletypes = /jpg|jpeg|png/i;
    // Checking extension of file which we want to upload.
    const checkExtension = allowedFiletypes.test(path.extname(file.originalname));
    // Checking mimetype of file which we want to upload (actually, this step is important, because file extension alone very easy to change).
    const checkMimetype = allowedFiletypes.test(file.mimetype);
    if (checkExtension && checkMimetype) {
      return cb(null, true);
    } else {
      return cb('ERROR: This filetype not allowed. Use static images only!');
    };
  }
});

// // @route: POST /upload
// // @desc: Files uploading.
// router.post('/upload', upload.single('photo'), (req, res, next) => {
//   if (req.file !== undefined) {
//     console.log(`File uploaded successfully: "${req.file.destination}/${req.file.filename}".`, req.file);
//     res.send(`File uploaded successfully: "${req.file.destination}/${req.file.filename}".`); // response for "POSTMAN".
//     next();
//   } else {
//     console.error('ERROR: There is nothing to upload!');
//     res.send('ERROR: There is nothing to upload!');
//     next();
//   };
// });

////////////////// MULTER MIDDLEWARE END //////////////////

// @route: POST /api/employees
// @desc: Create new employee's profile ('Multer' middleware already integrated).
router.post('/employees/', [
  // check('fullname', 'Fullname is required!').notEmpty(),
  // check('gender', 'Gender is required!').notEmpty(),
  // check('birthday', 'Birthday date is required!').notEmpty(),
  // check('contacts', 'Contact info is required!').notEmpty(),
  // check('position', 'Position is required!').notEmpty(),
  // check('salary', 'Salary is required!').notEmpty(),
  // check('hired', 'Date of hire is required!').notEmpty(),
], authMdw, upload.single('photo'), async (req, res, next) => {
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
    // // Here we setting default value for 'photo' in case we don't have employees photo yet but profile must be created right now.
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
    
    console.log(`MESSAGE: Profile '${newEmployee.fullname}' created successfully!`, newEmployee);
    res.status(201).json({ msg: `Profile '${newEmployee.fullname}' created successfully!`, newEmployee });
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
      console.log('File not found.');
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