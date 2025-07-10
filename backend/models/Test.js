import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
  name: String,
  mood: String,
});

const Test = mongoose.model("Test", TestSchema, "drugabaza");

export default Test;
