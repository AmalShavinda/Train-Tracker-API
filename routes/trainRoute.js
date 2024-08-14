import express from "express";
import {
  createTrain,
  getAllTrains,
  getTrainById,
  // getTrainByName,
  removeTrain,
  updateTrainLocation,
} from "../controllers/trainController.js";

const router = express.Router();

router.post("/add", createTrain);
router.delete("/remove/:id", removeTrain);
router.get("/get-trains", getAllTrains);
// router.get("/get-train/:trainName", getTrainByName);
router.get("/get-train/:id", getTrainById);

router.put("/update", updateTrainLocation);


export default router;
