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

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
).then(() => {
    console.log("Database connected");
}
)
.catch((err) => {
    console.log(err);
}
);



export default app;