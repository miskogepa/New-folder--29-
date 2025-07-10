import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Prikaz korisničkog profila
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "Korisnik nije pronađen" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Izmena korisničkog profila (uključuje i promenu lozinke)
export const updateUserProfile = async (req, res) => {
  try {
    const updates = { ...req.body };
    // Ako korisnik menja lozinku, hashuj je
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }
    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!user) return res.status(404).json({ error: "Korisnik nije pronađen" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Brisanje korisničkog naloga
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "Korisnik nije pronađen" });
    res.json({ message: "Korisnik obrisan" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
