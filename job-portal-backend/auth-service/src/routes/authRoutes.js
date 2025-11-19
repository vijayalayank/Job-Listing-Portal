import express from "express";
import { registerUser, loginUser,check,logoutUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/status", check);
router.post("/logout",logoutUser)


export default router;
