import Ship from "../models/Ship.js";

// Add Ship
export const addShip = async (req, res) => {
  try {
    const { shipName, imoNumber, shipType, capacity, status, location } = req.body;

    const existingShip = await Ship.findOne({ imoNumber });

    if (existingShip) {
      return res.status(400).json({
        success: false,
        message: "Ship already exists with this IMO Number",
      });
    }

    const ship = await Ship.create({
      shipName,
      imoNumber,
      shipType,
      capacity,
      status,
      location,
    });

    res.status(201).json({
      success: true,
      message: "Ship added successfully",
      ship,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllShips = async (req, res) => {
  try {
    const ships = await Ship.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: ships.length,
      ships,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Ship
export const updateShip = async (req, res) => {
  try {
    const ship = await Ship.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!ship) {
      return res.status(404).json({
        success: false,
        message: "Ship not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ship updated successfully",
      ship,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Ship
export const deleteShip = async (req, res) => {
  try {
    const ship = await Ship.findById(req.params.id);

    if (!ship) {
      return res.status(404).json({
        success: false,
        message: "Ship not found",
      });
    }

    await ship.deleteOne();

    res.status(200).json({
      success: true,
      message: "Ship deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};