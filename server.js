const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();

const connectDB = require('./config/connectDB');

// Handle all routes in one file 'index.js' for import convinience.
const routes = require('./routes/index');

// Set the routes.
app.use('/api/', routes.authRoute);
app.use('/api/', routes.employeeRoute);
app.use('/api/', routes.userRoute);

const APP_PORT = process.env.APP_PORT || 3000;

// Server start.
app.listen(process.env.APP_PORT || 3000, () => {
  console.log(`Server started at port ${APP_PORT}.`);
});

// Database connection.
connectDB();