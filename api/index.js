import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authroute.js';

dotenv.config();


const mongoURI = process.env.URL;


mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });



const app=express();

app.use(express.json())

app.listen(3000,()=>{
    console.log('Server running on port 3000');
})

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)


app.use((err,req,res,next)=>{
  const statusCode= err.statusCode || 500;
  const message =err.message || 'Integrnal server error';

  return res.status(statusCode).json({
    success:false,
    statusCode,
    message,
  });
});
