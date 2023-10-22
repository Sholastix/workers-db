require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
// const multer  = require('multer');
// const path = require('path');

const connectDB = require('./config/connectDB');

// Handle all routes in one file 'index.js' for import convinience.
const routes = require('./routes/api/index');

// Initialize the middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
// Сross-origin resource sharing permission middleware.
app.use(cors());

////////////////// MULTER MIDDLEWARE. LATER IT WILL BE RELOCATED AND INTEGRATED INTO APP. //////////////////

// // Path to employee photos.
// const dir = './public/photos';

// // Path to default employee's photo.
// const defaultPhoto = './public/photos/default.jpg';

// // Here we configuring the storage and naming settings.
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Set the storage path.
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     // Name of each uploaded file must be unique in our fs/db, but we also want to preserve intact file's original name and extension. 
//     const parts = file.originalname.split('.');
//     cb(null, parts[0] + '_' + Date.now() + '.' + parts[1]);
//   }
// });

// const upload = multer({
//   storage: storage,
//   // File filter's config.
//   fileFilter: (req, file, cb) => {
//     // Create RegExp for allowed filetypes.
//     const allowedFiletypes = /jpg|jpeg|png/i;
//     // Checking extension of file which we want to upload.
//     const checkExtension = allowedFiletypes.test(path.extname(file.originalname));
//     // Checking mimetype of file which we want to upload (actually, this step is important, because file extension alone very easy to change).
//     const checkMimetype = allowedFiletypes.test(file.mimetype);
//     if (checkExtension && checkMimetype) {
//       return cb(null, true);
//     } else {
//       return cb('ERROR: This filetype not allowed. Use static images only!');
//     };
//   }
// });

// // @route: POST /upload
// // @desc: Files uploading.
// app.post('/upload', upload.single('image'), (req, res, next) => {
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

///////////////////////////////////////////////////////

// Set the routes.
app.use('/api/', routes.authRoute);
app.use('/api/', routes.employeesRoute);
app.use('/api/', routes.usersRoute);

const APP_PORT = process.env.APP_PORT || 3000;

// Server start.
app.listen(APP_PORT, () => {
  console.log(`Server started at port ${APP_PORT}.`);
});

// Database connection.
connectDB();