import express from "express";
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config();
import authRoute from './routes/auth.js'
import usersRout from './routes/users.js'
import hotelRoute from './routes/hotels.js'
import roomRoute from './routes/room.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app =express ();


const connect = async () =>{
try {
    await mongoose.connect(process.env.MONGO);
    console.log('connected to mongoDB');
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on('disconnected',()=>{
    console.log('mongoDB disconnected');
})

//middlewares
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, //access-control-allow-credentials:true
  })
);
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth',authRoute);
app.use('/api/user',usersRout);
app.use('/api/hotels',hotelRoute);
app.use('/api/room',roomRoute);


app.use((err,req,res,next)=>{
  const errorStatus=err.status || 500;
  const errorMessage=err.message || 'somting went wrong';
 return res.status(errorStatus).json({
  success:false,
  status:errorStatus,
  message:errorMessage,
  stack:err.stack,
 })
})

app.listen(8800,()=>{
    connect();
    console.log("server work in 8800");
})