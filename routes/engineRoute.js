import express from "express";
import { addEngine, getEngineById, getEngines, removeEngine, updateEngine } from "../controllers/engineController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/add", verifyAdmin, addEngine);
router.get("/get-engines", verifyAdmin, getEngines);
router.get("/get-engines/:id", verifyAdmin, getEngineById);
// router.get("/get-engines/:id", getEngineById);
router.put("/update-engine/:id", verifyAdmin, updateEngine)
router.delete("/remove/:id", verifyAdmin, removeEngine);

export default router;
