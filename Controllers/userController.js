import User from '../Models/userSchema.js';
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"



dotenv.config();

export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, userName, email, password } = req.body; // Included firstName and lastName

        // Check for missing fields
        if (!firstName || !lastName || !userName || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields: firstName, lastName, userName, email, password.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        const newUser = new User({ firstName, lastName, userName, email, password: hashedPassword }); // Create new user instance

        await newUser.save(); // Save user to the database

        res.status(201).json({ message: 'User registration successful', data: newUser });

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Registration Failed: Internal Server Error' });
    }
};

export const loginUser = async(req,res) => {

    try {
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!User){
            return res.status(401).json({message:"user Not found"})
        }
        const passwordMatch = await bcrypt.compare(password,user.password)
        if(!passwordMatch){
            return res.status(401).json({message:"password Not found"})
        }

        //jwt part token creation after signin

        // const token = jwt.sign({},process.env.JWT_SECRET_KEY,{expiresIn:"1h"})

        res.status(200).json({message:"User login successfully"})
        
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'LOgin Failed: Internal Server Error' });
    }

}



