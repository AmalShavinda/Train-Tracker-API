import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import trainRoute from "./routes/trainRoute.js";
import userRoute from "./routes/userRoutes.js";
import trainHistoryRoute from "./routes/trainHistoryRoute.js";
import { startTrainLocationUpdates } from "./controllers/trainController.js";
import engineRoute from "./routes/engineRoute.js";
import swaggerDocs from "./utils/swagger.js";

const app = express();

const PORT = process.env.PORT;

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disconnected");
  });
};

startTrainLocationUpdates();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/train", trainRoute);
app.use("/api/users", userRoute);
app.use("/api/train-history", trainHistoryRoute);
app.use("/api/engine", engineRoute);

swaggerDocs(app, PORT);

app.listen(PORT || 8800, () => {
  connect();
  console.log(`Server run on port ${process.env.PORT || "8800"}`);
});
