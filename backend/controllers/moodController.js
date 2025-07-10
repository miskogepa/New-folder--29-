import Mood from "../models/Mood.js";

// Kreiranje novog unosa raspoloženja
export const createMood = async (req, res) => {
  try {
    const { mood, description, tags, date } = req.body;
    const newMood = new Mood({
      user: req.user.id,
      mood,
      description,
      tags,
      date: date || Date.now(),
    });
    await newMood.save();
    res.status(201).json(newMood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Prikaz svih unosa za korisnika
export const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user.id }).sort({ date: -1 });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Izmena unosa raspoloženja
export const updateMood = async (req, res) => {
  try {
    const mood = await Mood.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!mood) return res.status(404).json({ error: "Unos nije pronađen" });
    res.json(mood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Brisanje unosa raspoloženja
export const deleteMood = async (req, res) => {
  try {
    const mood = await Mood.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!mood) return res.status(404).json({ error: "Unos nije pronađen" });
    res.json({ message: "Unos obrisan" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
