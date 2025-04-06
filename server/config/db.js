import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Db Connected");
    } catch (error) {
        console.log('DB Connection Error: ', error);
        process.exit(1); // Stop the server if DB connection fails 
    }
}

