import express from "express";
import cors from "cors"
import dotenv from 'dotenv';
import {notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from 'cookie-parser';

import connectDB from "./config/db.js";
dotenv.config();
const port= 8000;
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoute.js'

const app= express();
app.use(cookieParser()); // Place cookieParser here

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

connectDB();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/users',userRoutes)

app.use('/api/admin',adminRoutes)

app.get('/',(req,res)=>res.send('server ready'))

app.use(notFound)
app.use(errorHandler)



app.listen(port,()=>{ console.log('server started.....');})