import { getDB } from "../utils/ConnectDB.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";



export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

  if (!["jobseeker", "employer"].includes(role)) {
  return res.status(400).json({ error: `Invalid role ${role}` ,  });
  }
    const db = getDB();
    const users = db.collection("users");
    

    // Check if user exists
    const existing = await users.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const passwordHash = await hashPassword(password);
    const result = await users.insertOne({ name, email, passwordHash, role, createdAt: new Date() });



    try{
      if(role==="jobseeker"){
        console.log("jobseeker");

        const jobseeker = db.collection("jobseekers");
        const jobres = await jobseeker.insertOne({userId:result.insertedId})
        res.status(201).json({ message: "User registered as ", role });
    }
    else if(role === "employer"){
      const employer = db.collection("employers");
      const empres = await employer.insertOne({userId:result.insertedId});
      res.status(201).json({ message: "User registered as ", role });
    }
    }
    catch(e){
      res.status(402).json({ message: "Invalid role", e });
    }

    
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

    console.log(token);

     res
    .cookie("token", token, {
      httpOnly: true,       // 🧠 Prevent JS access (security)
      secure: false,          // ✅ True in production (HTTPS)
      sameSite: "None",      // ✅ Needed for cross-origin (frontend <> backend)
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .status(200)
    .json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
