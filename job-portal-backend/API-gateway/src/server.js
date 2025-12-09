import express from "express"
import cors from "cors";
import morgan from "morgan"
import dotenv from "dotenv";
import routes from "./routes/index.js"
import { errorHandling } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser"

dotenv.config();
const app = express();



app.use(cors(
  {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }
));
app.use(morgan("dev"));
app.use(express.json());

app.use(cookieParser())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});



const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url} Body:`, req.body);
  next();
});

app.use(routes);




app.use(errorHandling);


app.listen(port, () => {
  console.log(`The API Gateway running on ${port}`);

})

