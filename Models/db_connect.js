const mongoose = require("mongoose");
const bookingSchema = require("./bookings");
const coachSchema = require("./coaches");
const userSchema = require("./users");

mongoose.connect("mongodb://localhost:27017/wecare").then(() => {
  console.log("DB is connected");
});

const userModel = mongoose.model("user", userSchema);
const coachModel = mongoose.model("coach", coachSchema);
const bookingModel = mongoose.model("booking", bookingSchema);

module.exports = { userModel, coachModel, bookingModel };
