import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import testRoutes from "./routes/test.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI); // Dodato za proveru

const app = express();
app.use(express.json());

// Pozovi connectDB funkciju
connectDB();

app.use("/test", testRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API radi!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
}); // port 5000 je default port za backend i na njemu radi server
