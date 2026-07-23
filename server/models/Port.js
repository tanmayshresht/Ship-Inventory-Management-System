import mongoose from "mongoose";

const portSchema = new mongoose.Schema(
  {
    portName: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Port", portSchema);