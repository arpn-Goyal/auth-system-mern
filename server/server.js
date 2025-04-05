import express from "express";
import mongoose from "mongoose";

const app = express();

app.use()
// connection
mongoose.connect('mongodb://localhost:27017/').then(()=>{
    console.log('Database Connected');
})

app.listen(5000, ()=>{
    console.log('Server is running on this port 5000');
})