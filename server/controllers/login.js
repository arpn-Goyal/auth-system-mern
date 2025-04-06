import jwt  from "jsonwebtoken";
import User from "../model/signUp.mongodb.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export const handleUserLogin = async (req, res)=>{
    try {
        const {email, password} = req.body;
        // 1. check if user exists
        const existingUser = await User.findOne({email}).select('+password');

        if(!existingUser){
            return res.status(404).json({    // 🔴 404 = Not Found
                message: "User doesn't Exist"
            })
        }

        const isPasswordValid  = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordValid ){                    
            return res.status(401).json({                  // 🟠 401 = Unauthorized
                message: 'Incorrect  Password',
            })
        }

        // Generate Token
        const token = jwt.sign({
            id: existingUser._id,
            email: existingUser.email,
            name: existingUser.name,
        }, process.env.JWT_SECRET, {expiresIn: "2h"}
    )
        return res.status(200).json({
            token,
            message: 'User Logged-in successfully'
        });

    } catch (error) {
        console.error("Error in Login:", error);
        res.status(500).json({ message: "Server error" });
    }
}