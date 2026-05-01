import mongoose from "mongoose";
import userModel from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose.set("debug", true);
mongoose.set("strictQuery", true);

// 🔥 Ensure URI exists
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is NOT defined. Check your .env file.");
  process.exit(1);
}

// 🔥 Connect once, log success
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });


// FUNCTIONS (unchanged)

function getUsers(name, job) {
  if (!name && !job) return userModel.find();
  if (name && !job) return userModel.find({ name });
  if (job && !name) return userModel.find({ job });
  return userModel.find({ name, job });
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  return new userModel(user).save();
}

function deleteUser(id) {
  return userModel.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  deleteUser,
};