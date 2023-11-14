require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');

const connectDB = require('./config/connectDB');

// Handle all routes in one file 'index.js' for import convinience.
const routes = require('./routes/api/index');

// Initialize the middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// Сross-origin resource sharing permission middleware.
app.use(cors());

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