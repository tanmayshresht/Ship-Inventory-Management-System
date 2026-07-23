import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import shipRoutes from "./routes/shipRoutes.js";
import portRoutes from "./routes/portRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import shipmentRoutes from "./routes/shipmentRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/ships", shipRoutes);
app.use("/api/ports", portRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/shipments", shipmentRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚢 Ship Inventory Backend Running Successfully",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});