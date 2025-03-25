import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';    
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import taskRoutes from "./Routes/TaskRoutes.js";


dotenv.config();

const app = express();
app.use(express.json()); 
app.use(cors());   

app.use("/tasks", taskRoutes);
app.get("/" , (req, res) => {   
    res.send("Hello wolrds from server");
}
);

const connectDB = async () => {
    if (isConnected) return; // If already connected, skip connection
  
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      isConnected = true;
      console.log("✅ MongoDB Connected!");
    } catch (err) {
      console.error("❌ MongoDB Connection Error:", err);
    }
  };
  connectDB();



export default app;