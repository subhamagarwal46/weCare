const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true, require: true },
    name: {
      type: String,
      minlength: [3, "Name should be between 3 and 50"],
      maxlength: [50, "Name should be between 3 and 50"],
    },
    password: {
      type: String,
      require: true,
      minlength: [5, "Name should be between 5 and 10"],
      maxlength: [10, "Name should be between 5 and 10"],
    },
    gender: {
      type: String,
      validate: [
        function (v) {
          if (v == "M" || v == "F") {
            return true;
          } else return false;
        },
        "Gender can be M or F",
      ],
    },
    dateOfBirth: {
      type: Date,
      validate: [
        function (v) {
          let currentYear = new Date().getFullYear();
          let year = v.getFullYear();
          if (currentYear - year > 20 && currentYear - year < 100) {
            return true;
          } else return false;
        },
        "Age should be greater than 20 and less than 100",
      ],
    },
    email: {
      type: String,
      unique: true,
      validate: [
        function (v) {
          return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
            v
          );
        },
        "Please enter a valid email",
      ],
    },
    mobileNumber: {
      type: Number,
      validate: [
        function (v) {
          return /^\d{10}$/.test(v);
        },
        "Phone number must be 10 digits only",
      ],
    },
    pincode: {
      type: Number,
      validate: [
        function (v) {
          return /^\d{6}$/.test(v);
        },
        "Pincode must be 6 digits only",
      ],
    },
    city: {
      type: String,
      minlength: [3, "City should have 3 to 20 characters"],
      maxlength: [20, "City should have 3 to 20 characters"],
    },
    state: { type: String },
    country: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = userSchema;
