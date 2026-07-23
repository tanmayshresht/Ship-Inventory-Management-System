import Port from "../models/Port.js";

// Get All Ports
export const getPorts = async (req, res) => {
  try {
    const ports = await Port.find();

    res.status(200).json({
      success: true,
      ports,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Port
export const addPort = async (req, res) => {
  try {
    const { portName, country, code, status } = req.body;

    const port = await Port.create({
      portName,
      country,
      code,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Port added successfully",
      port,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Port
export const updatePort = async (req, res) => {
  try {
    const { id } = req.params;

    const port = await Port.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Port updated successfully",
      port,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Port
export const deletePort = async (req, res) => {
  try {
    const { id } = req.params;

    await Port.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Port deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};