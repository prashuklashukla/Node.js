import mongoose from "mongoose";

import dotenv from 'dotenv'
dotenv.config();


export const connectDB = () =>{
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("DB Error:", err));
}


