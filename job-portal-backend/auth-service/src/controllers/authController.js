import { getDB } from "../utils/ConnectDB.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";



export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const db = getDB();
    const users = db.collection("users");

    // Check if user exists
    const existing = await users.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const passwordHash = await hashPassword(password);
    const result = await users.insertOne({ name, email, passwordHash, role, createdAt: new Date() });

    const token = generateToken({ userId: result.insertedId, role });

    res.status(201).json({ message: "User registered", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = getDB();
    const users = db.collection("users");

    const user = await users.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken({ userId: user._id, role: user.role });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
