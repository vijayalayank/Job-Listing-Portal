import express from "express"
import cors from "cors";
import morgan from "morgan"
import dotenv from "dotenv";
import routes from "./routes/index.js"
import { errorHandling } from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


const port = process.env.PORT || 5000;

app.use("/api",routes);

app.use(errorHandling);


app.listen(()=>{
    console.log(`The API Gateway running on ${port}`);
    
})

