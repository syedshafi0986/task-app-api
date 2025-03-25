import express from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../Controller/TaskController.js";

const router = express.Router();

router.get("/get", getTasks);
router.post("/post", createTask);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);

export default router;
