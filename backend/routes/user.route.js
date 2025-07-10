import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// Prikaz korisničkog profila
router.get("/:id", getUserProfile);

// Izmena korisničkog profila
router.put("/:id", updateUserProfile);

// Brisanje korisničkog naloga
router.delete("/:id", deleteUser);

export default router;
