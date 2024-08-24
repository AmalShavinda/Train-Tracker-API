import express from "express";
import { getAllUsers, getUserById, removeUser, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/get-users", getAllUsers);
router.get("/get-user/:id", getUserById);
router.put("/update-user/:id", updateUser);
router.delete("/remove/:id", removeUser);

export default router;
