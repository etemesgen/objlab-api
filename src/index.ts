import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";

dotenv.config();

const app: Express = express();

mongoose
  .connect(process.env.MONGO_URL || "")
  .then(() => console.log("Connected to MongoDB database !"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(cors());

const url = process.env.API_URL || "http://localhost:3000";
const port = process.env.API_PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("ObjLab API");
});

app.listen(port, () => {
  console.log(`Server is running at ${url}:${port}`);
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);