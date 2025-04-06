import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password:{
        type: String,
      required: true,
    },

}, { timestamps: true,}) // this will add createdAt and updatedAt automatically

// Exporting model
const User = mongoose.model('User', userSchema);
export default User;