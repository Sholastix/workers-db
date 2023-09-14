const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// // Handle all routes in one file 'index.js' for import convinience.
// const routes = require('./routes/index');

const APP_PORT = process.env.APP_PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Server start.
app.listen(APP_PORT, () => {
  console.log(`Server started at port ${APP_PORT}.`);
});

// Database connection.
(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Database connected.')
  } catch (err) {
    console.error(`Connection failed: ${MONGODB_URI}`, err);
    process.exit(1);
  };
})();