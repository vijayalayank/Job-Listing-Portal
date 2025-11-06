import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client  = new MongoClient(process.env.MONGO_URI);

let db;

export const connectDB = async()=>{
        try {
    await client.connect();
    db = client.db("JobListingPortal"); // database from URI
    console.log("✅ MongoDB Auth Service Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
}


export const getDB = () => db;