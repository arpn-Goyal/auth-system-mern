
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).json({    // 401 UnAuthorized
            message: 'No token provided'
        })

    const token = authHeader.split(" ")[1];

    try {
        // verify TOken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" });
    }
    
}