import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Registracija korisnika
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Sva polja su obavezna." });
    }
    // Provera jedinstvenosti
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email ili korisničko ime već postoji." });
    }
    // Hash lozinke
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Kreiranje korisnika
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    // Ne vraćamo lozinku
    const userObj = user.toObject();
    delete userObj.password;
    res.status(201).json(userObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login korisnika
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email i lozinka su obavezni." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Neispravan email ili lozinka." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Neispravan email ili lozinka." });
    }
    // Generiši JWT token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || "tajna",
      { expiresIn: "7d" }
    );
    res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
