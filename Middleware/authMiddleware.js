//jwt.verify
import jwt from 'jsonwebtoken'
import User from "../Models/userSchema.js"
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(401).json({ message: "Access Denied: Not a valid user" });
        }

        next();
    } catch (error) {
        console.log(error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid Token" });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token has expired" });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export default authMiddleware;