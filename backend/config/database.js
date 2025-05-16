import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully".green.inverse);
  } catch (error) {
    console.log(`Error:${error.message}`.red.inverse);
  }
};
export default connectDB;
