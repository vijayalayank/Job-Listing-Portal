// api-gateway/src/routes/index.js
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import axios from "axios";

const router = express.Router();

// Logging
router.use((req, res, next) => {
  console.log("🔹 Router sees:", req.originalUrl);
  next();
});

// Proxy /api/auth to Auth Service
router.use("/api/auth", async (req, res) => {
  try {
    const authServiceURL = "http://localhost:5001" + req.originalUrl;
    console.log(req.originalUrl)

    console.log("🔄 Forwarding to:", authServiceURL);

    // Forwarding headers + body + method
    const response = await axios({
      method: req.method,
      url: authServiceURL,
      data: req.body,
      headers: req.headers,
      withCredentials: true, // allow cookies to flow through
    });

    console.log("✅ Response from Auth Service:", response.status);

    // Send back to frontend
    if (response.headers["set-cookie"]) {
      res.setHeader("set-cookie", response.headers["set-cookie"]);
    }

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("❌ Error forwarding request:", error.message);
    if (error.response) {
      return res
        .status(error.response.status)
        .json(error.response.data || { message: "Error from Auth Service" });
    }
    res.status(500).json({ message: "Auth Service unreachable" });
  }
});

export default router;
