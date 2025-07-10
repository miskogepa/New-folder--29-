import express from "express";
import { createTest, getAllTests } from "../controllers/testController.js";

const router = express.Router();

// Test ruta za unos podataka
router.post("/", createTest);

// Test ruta za prikaz svih podataka
router.get("/", getAllTests);

export default router;
