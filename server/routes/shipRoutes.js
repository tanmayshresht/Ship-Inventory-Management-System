import protect from "../middleware/authMiddleware.js";
import express from "express";
import {
  addShip,
  getAllShips,
  updateShip,
  deleteShip,
} from "../controllers/shipController.js";

const router = express.Router();

router.post("/", protect, addShip);
router.get("/", protect, getAllShips);
router.put("/:id", protect, updateShip);
router.delete("/:id", protect, deleteShip);

export default router;