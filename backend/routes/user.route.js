import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Prikaz korisničkog profila (javno)
router.get("/:id", getUserProfile);

// Izmena korisničkog profila (privatno)
router.put("/:id", auth, updateUserProfile);

// Brisanje korisničkog naloga (privatno)
router.delete("/:id", auth, deleteUser);

export default router;
