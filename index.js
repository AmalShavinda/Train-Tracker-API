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
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

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

updateTrain1Location();
// updateTrain2Location();
// updateTrain3Location();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// app.get('/', (req, res) => {
//   res.send('Hello World')
// });

// app.get('/api/test', (req, res) => {
//   res.send('Hello World Test')
// });

// Define Swagger options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EventZing - Event Management App",
      version: "1.0.0",
      description: "API Documentation for Event Management.",
    },
    servers: [
      {
        url: "https://13.60.80.168:5000",
        description: "AWS server",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API routes files
};

// Initialize Swagger specs
const swaggerSpecs = swaggerJsdoc(options);

// Serve Swagger documentation
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use("/api/auth", authRoute);
app.use("/api/train", trainRoute);
app.use("/api/users", userRoute);
app.use("/api/train-history", trainHistoryRoute);

app.listen(process.env.PORT || 8800, () => {
  connect();
  console.log(`Server run on port ${process.env.PORT || "8800"}`);
});
