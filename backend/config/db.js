import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Povezan sa MongoDB!");
  } catch (err) {
    console.error("Greška pri povezivanju sa bazom:", err);
    process.exit(1);
  }
};

export default connectDB;
