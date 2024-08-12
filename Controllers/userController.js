import User from '../Models/userSchema.js';
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import nodemailer from 'nodemailer';
import jwt from "jsonwebtoken"



dotenv.config();

export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, userName, email, password } = req.body; // Included firstName and lastName

        // Check for missing fields
        if (!firstName || !lastName || !userName || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields: firstname, lastname, username, email, password.' });
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

const generateToken = (user) => {
    const token = jwt.sign(
        { _id: user._id, email: user.email }, // User data you want to include in the token
        process.env.JWT_SECRET_KEY, // Your secret key
        { expiresIn: '1h' } // Token expiration time
    );
    return token;
};


export const loginUser = async(req,res) => {

    try {
        const {email,password} = req.body
        const userDetails = await User.findOne({email})
        if(!User){
            return res.status(401).json({message:"user Not found"})
        }
        const passwordMatch = await bcrypt.compare(password,userDetails.password)
        if(!passwordMatch){
            return res.status(401).json({message:"password Not found"})
        }

        //jwt part token creation after signin

        // const token = jwt.sign({},process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
        // userDetails.token = token;
        // await userDetails.save();

        const token = generateToken(userDetails);

        res.status(200).json({message:"User login successfully",token: token})
        
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Login Failed: Internal Server Error' });
    }

}



// export const requestPasswordReset = async (req, res) => {
//     const { email } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Generate a reset token
//         const resetToken = crypto.randomBytes(32).toString('hex');
//         user.resetPasswordToken = resetToken;
//         user.resetPasswordExpires = Date.now() + 3600000; // Token valid for 1 hour
//         await user.save();

//         // Setup Nodemailer
//         const transporter = nodemailer.createTransport({
//             host: "smtp.ethereal.email", // Use appropriate SMTP settings
//             port: 587,
//             secure: false,
//             auth: {
//                 user: process.env.PASSMAIL, // Your email
//                 pass: process.env.PASSKEY,   // Your email password or app password
//             },
//         });

//         // Prepare reset email
//         const resetLink = `http://localhost:5000/reset-password/${resetToken}`;
//         const mailOptions = {
//             from: '"nodemailer" <msdimthi6@gmail.com>',
//             to: email,
//             subject: 'Password Reset',
//             text: `Please click the following link to reset your password: ${resetLink}`,
//         };

//         // Send email
//         await transporter.sendMail(mailOptions);
//         res.status(200).json({ message: 'Password reset link has been sent to your email' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error generating password reset link' });
//     }
// };


export const getuser = async(req,res)=>{
    try {
      const userId = req.user._id
      console.log(userId);
      const user = await User.findById(userId)
      res.status(200).json({message:"Authorized user",data:[user]})
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error Failed to get the user" });
    }
  }