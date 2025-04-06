import User from "../model/signUp.mongodb.js";
import bcrypt from 'bcrypt';

export const handleUserLogin = async (req, res)=>{
    try {
        const {email, password} = req.body;
        // 1. check if user exists
        const existinguser = await User.findOne({email}).select('+password');

        if(!existinguser){
            return res.status(404).json({    // 🔴 404 = Not Found
                message: "User doesn't Exist"
            })
        }

        const isPasswordValid  = await bcrypt.compare(password, existinguser.password);
        if(!isPasswordValid ){                    
            return res.status(401).json({                  // 🟠 401 = Unauthorized
                message: 'Incorrect  Password',
            })
        }

        return res.status(200).json({
            message: 'User Logged-in successfully'
        });
    } catch (error) {
        console.error("Error in Login:", error);
        res.status(500).json({ message: "Server error" });
    }
}