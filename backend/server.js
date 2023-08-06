import express from "express";
import dotenv from 'dotenv';
import {notFound, errorHandler } from "./middleware/errorMiddle.js";
import connectDB from "./config/db.js";
dotenv.config();
const port= 8000;
import userRoutes from './routes/userRoutes.js';

const app= express();

connectDB();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/users',userRoutes)

app.get('/',(req,res)=>res.send('server ready'))

app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>{ console.log('server started.....');})