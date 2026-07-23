import express from "express";
import {
  getPorts,
  addPort,
  updatePort,
  deletePort,
} from "../controllers/portController.js";

const router = express.Router();

router.get("/", getPorts);
router.post("/", addPort);
router.put("/:id", updatePort);
router.delete("/:id", deletePort);

export default router;