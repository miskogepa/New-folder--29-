import express from "express";
import {
  createMood,
  getMoods,
  updateMood,
  deleteMood,
} from "../controllers/moodController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Sve rute su zaštićene JWT middleware-om
router.use(auth);

// Kreiranje novog unosa
router.post("/", createMood);

// Prikaz svih unosa za korisnika
router.get("/", getMoods);

// Izmena unosa
router.put("/:id", updateMood);

// Brisanje unosa
router.delete("/:id", deleteMood);

export default router;
