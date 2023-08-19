import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnect from "./config/config.js";
import userRouter from "./routes/userRoute.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

dbConnect();

app.use("/", userRouter);

const port = process.env.PORT;
app.listen(port || 5000, () => {
  console.log(`server running ${port}`);
});
