import mongoose from "mongoose";

const shipSchema = new mongoose.Schema(
  {
    shipName: {
      type: String,
      required: true,
      trim: true,
    },

    imoNumber: {
      type: String,
      required: true,
      unique: true,
    },

    shipType: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Available", "Maintenance", "On Voyage"],
      default: "Available",
    },

    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ship = mongoose.model("Ship", shipSchema);

export default Ship;