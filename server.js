require('dotenv').config();
const express = require('express');
const app = express();

const connectDB = require('./config/connectDB');

// Handle all routes in one file 'index.js' for import convinience.
const routes = require('./routes/index');

// Initialize the middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

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