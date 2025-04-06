import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

const app = express();

// It allow React to call Node APIs.
app.use(cors());

// To Properly parse Json Data from Frontend
app.use(express.json());

// connection
mongoose.connect('mongodb://localhost:27017/').then(()=>{
    console.log('Database Connected');
})

app.listen(5000, ()=>{
    console.log('Server is running on this port 5000');
})