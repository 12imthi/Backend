import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongodb_Url = process.env.MONGODB_URL;

const connectDB = async (req, res) => {
  try {
    console.log(mongodb_Url);
    // const options = {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // }

    const connection = await mongoose.connect(mongodb_Url);
    console.log("mongodb is connected");
    return connection;
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "some error" });
  }
};

export default connectDB;
