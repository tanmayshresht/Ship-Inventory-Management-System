import express from "express";
import {
  getShipments,
  addShipment,
  updateShipment,
  deleteShipment,
} from "../controllers/shipmentController.js";

const router = express.Router();

router.get("/", getShipments);
router.post("/", addShipment);
router.put("/:id", updateShipment);
router.delete("/:id", deleteShipment);

export default router;