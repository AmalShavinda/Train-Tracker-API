import express from "express";
import {
  createTrain,
  removeTrain,
  updateTrainLocation,
} from "../controllers/trainController.js";

const router = express.Router();

router.post("/add", createTrain);
router.delete("/remove/:id", removeTrain);
router.put("/update/:id", updateTrainLocation);

export default router;
