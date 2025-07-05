import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_name } from "../../constants.js";

dotenv.config()


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${DB_name}`)
        console.log(`Database connected with ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("connection failed",error)
    }
}

export default connectDB