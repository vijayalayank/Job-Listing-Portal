// auth-service/src/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./utils/ConnectDB.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());

app.use(cookieParser());

// Unified logging middleware
app.use((req, res, next) => {
  console.log(`➡️ [${req.method}] ${req.originalUrl}`, req.body ? `Body: ${JSON.stringify(req.body)}` : "");
  next();
});

// Connect to MongoDB
await connectDB();
console.log("✅ Connected to MongoDB");

// Mount routes
app.use("/api/auth", authRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Auth Service running on port ${PORT}`));
