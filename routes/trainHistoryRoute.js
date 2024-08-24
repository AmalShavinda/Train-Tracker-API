import express from "express";
import { getTrainHistoryByDate } from "../controllers/trainHistoryController.js";

const router = express.Router();

router.get("/", getTrainHistoryByDate);

export default router;
