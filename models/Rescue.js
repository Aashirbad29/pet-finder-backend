const mongoose = require("mongoose");

const RescueSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pet_details: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    request_date: {
      type: Date,
      default: Date.now,
    },
    response_date: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rescue", RescueSchema);
