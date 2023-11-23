require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');

const connectDB = require('./config/connectDB');
const checkDirectory = require('./utils/checkDirectory');

// Handle all routes in one file 'index.js' for import convinience.
const routes = require('./routes/api/index');

// Initialize the middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Here we creating a virtual path prefix (path with part '/static/' does not really exist in FS) for files that are served by 'express.static' function.
// Also we don't want relative path like 'app.use(express.static('public'))' because it depends on directory from where we launching our node process.
// So we creating safe absolute path (mainly because I like this approach more :)).
app.use('/static', express.static(path.join(__dirname, 'public')));
// Сross-origin resource sharing permission middleware.
app.use(cors());

// Check if folder for uploading photos already exists and if not - create it.
checkDirectory();

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