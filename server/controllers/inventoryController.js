import Inventory from "../models/Inventory.js";

// Get All Inventory
export const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();

    res.status(200).json({
      success: true,
      inventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Inventory Item
export const addInventory = async (req, res) => {
  try {
    const { sku, itemName, category, quantity, unit } = req.body;

    const item = await Inventory.create({
      sku,
      itemName,
      category,
      quantity,
      unit,
    });

    res.status(201).json({
      success: true,
      message: "Inventory item added successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Inventory Item
export const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Inventory.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Inventory updated successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Inventory Item
export const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;

    await Inventory.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Inventory item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};