import Shipment from "../models/Shipment.js";
import Inventory from "../models/Inventory.js";

// Get All Shipments
export const getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find()
      .populate("sourcePort")
      .populate("destinationPort")
      .populate("ship")
      .populate("inventoryItem");

    res.status(200).json({
      success: true,
      shipments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create Shipment
export const addShipment = async (req, res) => {
  try {
    const {
      sourcePort,
      destinationPort,
      ship,
      inventoryItem,
      quantity,
      status,
    } = req.body;

    const shipment = await Shipment.create({
      sourcePort,
      destinationPort,
      ship,
      inventoryItem,
      quantity,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Shipment created successfully",
      shipment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Shipment Status
export const updateShipment = async (req, res) => {
  try {
    const { id } = req.params;

    const shipment = await Shipment.findById(id);

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found",
      });
    }

    shipment.status = req.body.status;

    await shipment.save();

    // Inventory auto update
    if (req.body.status === "Delivered") {
      const item = await Inventory.findById(
        shipment.inventoryItem
      );

      if (item) {
        item.quantity -= shipment.quantity;

        if (item.quantity < 0) {
          item.quantity = 0;
        }

        await item.save();
      }
    }

    res.status(200).json({
      success: true,
      message: "Shipment updated successfully",
      shipment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Shipment
export const deleteShipment = async (req, res) => {
  try {
    await Shipment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Shipment deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};