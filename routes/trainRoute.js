import express from "express";
import {
  createTrain,
  getAllTrains,
  getTrainById,
  removeTrain,
  updateTrain,
} from "../controllers/trainController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/add", createTrain);
router.put("/update-train/:id", updateTrain);
router.delete("/remove/:id", removeTrain);
router.get("/get-trains", verifyToken, getAllTrains);
router.get("/get-train/:id", verifyToken, getTrainById);

export default router;
