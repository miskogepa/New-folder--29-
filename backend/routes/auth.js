import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Registracija korisnika
router.post("/register", registerUser);
// Login korisnika
router.post("/login", loginUser);

export default router;
