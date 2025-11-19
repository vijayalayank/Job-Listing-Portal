import { getDB } from "../utils/ConnectDB.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import jwt from "jsonwebtoken";



export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate role
    if (!["jobseeker", "employer"].includes(role)) {
      return res.status(400).json({ error: `Invalid role ${role}` });
    }

    const db = getDB();
    const users = db.collection("users");

    // Check if email already exists
    const existing = await users.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await hashPassword(password);

    // Insert base user
    const result = await users.insertOne({
      name,
      email,
      passwordHash,
      role,
      createdAt: new Date()
    });

    const userId = result.insertedId;

    // Insert into role-specific collection
    if (role === "jobseeker") {
      await db.collection("jobseekers").insertOne({ userId });
    } else {
      await db.collection("employers").insertOne({ userId });
    }

    res.status(201).json({ message: "User registered", role });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Strict role validation (MITM-safe)
    if (!["jobseeker", "employer"].includes(role)) {
      return res.status(400).json({ message: `Invalid role ${role}` });
    }

    const db = getDB();
    const users = db.collection("users");

    // Check email + role together to avoid conflict
    const user = await users.findOne({ email, role });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or role",
      });
    }

    // Check password
    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = generateToken({
      userId: user._id,
      role: user.role,
    });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,            // change to true in production (HTTPS)
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      message: "Login successful",
      role: user.role,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const check = (req, res) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) return res.json({ loggedIn: false });

  try {
    console.log("hello I reached try block");
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    res.json({ loggedIn: true, user: decoded });
  } catch (err) {
    console.log("What is the error ",err);
    res.json({ loggedIn: false });
  }
};


export const logoutUser = (req,res)=>{
    res.clearCookie("token");
  res.json({ success: true });
}