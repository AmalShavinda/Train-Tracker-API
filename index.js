import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import trainRoute from "./routes/trainRoute.js";
import {
  updateTrain1Location,
  updateTrain2Location, updateTrain3Location
} from "./controllers/trainController.js";

const app = express();

dotenv.config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, options);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disconnected");
  });
};

updateTrain1Location();
updateTrain2Location();
updateTrain3Location();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World')
});

app.get('/api/test', (req, res) => {
  res.send('Hello World Test')
});

app.use("/api/auth", authRoute);
app.use("/api/train", trainRoute);

app.listen( process.env.PORT ||8800, () => {
  connect();
  console.log(`Server run on port ${process.env.PORT || '8800'}`);
});
