import mongoose from "mongoose";

const dbName = "vehicle-registration";
const dbPass = encodeURIComponent("arun2nly2");

export const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://arun:${dbPass}@school.b6qkdnb.mongodb.net/${dbName}?retryWrites=true&w=majority`
    );

    console.log("DB connection established...");
  } catch (error) {
    console.log("DB connection failed...");
    console.log(error.message);
  }
};
