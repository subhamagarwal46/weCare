const mongoose = require("mongoose");

const coachSchema = new mongoose.Schema(
  {
    coachId: { type: String, require: true, unique: true },

    name: {
      type: String,
      unique: true,
      validate: [
        function (v) {
          if (v.length >= 3 && v.length < 30) return true;
          else return false;
        },
        "Name should be 3 to 30 characters",
      ],
    },

    password: {
      type: String,
      require: true,
      minlength: [8, "Password should be 8 to 12 characters"],
      maxlength: [12, "Password should be 8 to 12 characters"],
    },

    gender: {
      type: String,
      validate: [
        function (v) {
          if (v == "M" || v == "F") return true;
          else return false;
        },
        "Gender can be M or F only",
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

    mobileNumber: {
      type: Number,
      validate: [
        function (v) {
          return /^\d{10}$/.test(v);
        },
        "Phone number should be 10 digits only",
      ],
    },

    speciality: {
      type: String,
      validate: [
        function (v) {
          if (v.length >= 10 && v.length <= 50) {
            return true;
          } else return false;
        },
        "Speciality should have 10 to 50 characters",
      ],
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = coachSchema;
