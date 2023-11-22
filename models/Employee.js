const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      // required: true,
      default: 'default.jpg'
    },

    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      required: true,
      trim: true,
    },

    birthday: {
      type: Date,
      required: true,
      trim: true,
    },

    contacts: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    salary: {
      type: Number,
      required: true,
    },

    hired: {
      type: Date,
      required: true,
    },
  },

  {
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: true },
  },
);

module.exports.Employee = mongoose.model('Employee', EmployeeSchema);