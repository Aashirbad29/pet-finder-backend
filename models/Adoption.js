const mongoose = require("mongoose");

const AdoptionSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user id"],
    },
    pet_id: {
      type: mongoose.Types.ObjectId,
      ref: "Pet",
      required: [true, "Please provide pet id"],
    },
    request_date: {
      type: Date,
      default: Date.now,
    },
    response_date: {
      type: Date,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Adoption", AdoptionSchema);
