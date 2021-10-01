const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, require: true, unique: true },
    userId: { type: String, require: true },
    coachId: { type: String, require: true },
    appointmentDate: { type: Date, require: true },
    slot: {
      type: String,
      require: true,
      validate: [
        function (v) {
          return /^([1-9]|1[0-2]) (AM|PM) to ([1-9]|1[0-2]) (AM|PM)$/.test(v);
        },
        "Slot should be a valid one",
      ],
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = bookingSchema;
