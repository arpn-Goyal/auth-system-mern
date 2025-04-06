import User from "../model/signUp.mongodb.js";
import bcrypt from 'bcrypt';

export const handleRegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Hash password
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        console.log(req.body);

        const newUser = await User.create({ name, email, password: hashPassword });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });

    } catch (error) {
        // Duplicate key error from MongoDB
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }
        console.error("Error in registration:", error);
        res.status(500).json({ message: "Server error" });
    }
}