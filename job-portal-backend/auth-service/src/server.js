import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./utils/ConnectDB.js";

dotenv.config();
const app = express();

app.use(express.json());

// Connect to MongoDB
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Connected to MongoDB");

    // Routes
    app.use("/api/auth", authRoutes);

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`✅ Auth Service running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Failed to start server", err);
    process.exit(1);
  }
};

startServer();
