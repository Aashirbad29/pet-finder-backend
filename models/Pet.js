const mongoose = require("mongoose");

const PetSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide pet name"],
    },
    species: {
      type: String,
      required: [true, "Please provide species type"],
      enum: ["dog", "cat", "other animals"],
    },
    breed: {
      type: String,
      required: [true, "Please provide breed type"],
    },
    age: {
      type: Number,
      required: [true, "Please provide pet's age"],
    },
    gender: {
      type: String,
      required: [true, "Please provide gender"],
      enum: ["male", "female"],
    },
    description: {
      type: String,
      required: [true, "Please provide short description"],
    },
    photo: {
      type: String,
      required: [true, "Please provide picture"],
    },
    vaccination_status: {
      type: Boolean,
      required: [true, "Please provide vaccination status"],
      default: false,
    },
    is_adopted: {
      type: Boolean,
      default: false,
    },
    adopted_by: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    is_rescued: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

PetSchema.pre("remove", async function (next) {
  try {
    await this.model("Adoption").deleteMany({ pet_id: this._id });
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Pet", PetSchema);
