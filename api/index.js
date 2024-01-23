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

// mongoose
// .connect('mongodb+srv://vavaldasjaiwanth:jaiv9164@mern-estate.wpslkfy.mongodb.net/?retryWrites=true&w=majority')
// .then(()=>{
//     console.log("Connected to MongoDB!!");
// })
// .catch((err)=>{
//     console.log(err);
// })

const app=express();

app.use(express.json())

app.listen(3000,()=>{
    console.log('Server running on port 3000');
})

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)