import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
  {
    sourcePort: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Port",
      required: true,
    },

    destinationPort: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Port",
      required: true,
    },

    ship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ship",
      required: true,
    },

    inventoryItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "In Transit", "Delivered"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Shipment", shipmentSchema);