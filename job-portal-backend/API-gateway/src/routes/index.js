import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import services from "../config/serviceUrls.js"
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use("/auth",createProxyMiddleware({target:services.authService,changeOrigin:true}));


export default router;
