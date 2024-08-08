import express from "express";
import {
  createTrain,
  getAllTrains,
  getTrainById,
  removeTrain,
  updateTrainLocation,
} from "../controllers/trainController.js";

const router = express.Router();

router.post("/add", createTrain);
router.delete("/remove/:id", removeTrain);
// router.put("/update/:id", updateTrainLocation);
router.get("/get-trains", getAllTrains);
router.get("/get-train/:id", getTrainById);

router.put("/update", updateTrainLocation);


export default router;
