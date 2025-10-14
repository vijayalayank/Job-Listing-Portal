import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port =process.env.PORT;

//connect DB 


//Routes to handle req


app.listen(()=>{
    console.log(`Server is running is port ${port}`);
})