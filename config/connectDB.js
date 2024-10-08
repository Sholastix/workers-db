require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Database connected.')
  } catch (err) {
    console.error(`Connection failed: ${MONGODB_URI}`, err.message);
    process.exit(1);
  };
};

module.exports = connectDB;