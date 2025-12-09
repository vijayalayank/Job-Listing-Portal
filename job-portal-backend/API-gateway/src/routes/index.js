// api-gateway/src/routes/index.js
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import axios from "axios";

const router = express.Router();

// Helper to fix body parsing issue with proxy
import { fixRequestBody } from 'http-proxy-middleware';

// Job Service Proxy
// Common Proxy Options
const proxyOptions = {
  target: 'http://localhost:5002',
  changeOrigin: true,
  on: {
    proxyReq: (proxyReq, req, res) => {
      if (req.body && Object.keys(req.body).length > 0) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
    }
  }
};

// Job Proxy with rewrite and path logging
const jobProxy = createProxyMiddleware({
  ...proxyOptions,
  pathRewrite: { '^/': '/api/jobs/' }
});

// Application Proxy with rewrite
const applicationProxy = createProxyMiddleware({
  ...proxyOptions,
  pathRewrite: { '^/': '/api/applications/' }
});

router.use('/api/jobs', jobProxy);
router.use('/api/applications', applicationProxy);

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

    // Filter headers to avoid conflicts (host, content-length)
    const headers = { ...req.headers };
    delete headers['host'];
    delete headers['content-length'];

    // Forwarding headers + body + method
    const response = await axios({
      method: req.method,
      url: authServiceURL,
      data: req.body,
      headers: headers,
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
