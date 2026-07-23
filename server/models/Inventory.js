import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
    },

    itemName: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    unit: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Inventory", inventorySchema);