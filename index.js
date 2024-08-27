import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import trainRoute from "./routes/trainRoute.js";
import userRoute from "./routes/userRoutes.js";
import trainHistoryRoute from "./routes/trainHistoryRoute.js";
import {
  updateTrain1Location,
  updateTrain2Location,
  updateTrain3Location,
} from "./controllers/trainController.js";
import engineRoute from "./routes/engineRoute.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();

dotenv.config();

// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 5000,
//   socketTimeoutMS: 45000,
// };

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

// updateTrain1Location();
// updateTrain2Location();
// updateTrain3Location();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRoute);
app.use("/api/train", trainRoute);
app.use("/api/users", userRoute);
app.use("/api/train-history", trainHistoryRoute);
app.use("/api/engine", engineRoute);

app.listen(process.env.PORT || 8800, () => {
  connect();
  console.log(`Server run on port ${process.env.PORT || "8800"}`);
});
