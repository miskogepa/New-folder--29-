import Test from "../models/Test.js";

// Kreiranje novog test dokumenta
export const createTest = async (req, res) => {
  try {
    const { name, mood } = req.body;
    const novi = new Test({ name, mood });
    await novi.save();
    res.status(201).json(novi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Prikaz svih test dokumenata
export const getAllTests = async (req, res) => {
  try {
    const svi = await Test.find();
    res.json(svi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
