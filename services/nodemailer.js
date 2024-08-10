import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // use true for port 465
    auth: {
        user: process.env.PASSMAIL, // Your email account for sending
        pass: process.env.PASSKEY,   // Your email account password
    },
});

/**
 * Sends a password reset email.
 * @param {string} email = process.env.PASSMAIL The recipient's email address.
 * @param {string} resetLink - The link for resetting the password.
 */
async function sendPasswordResetEmail(email, resetLink) {
    try {
        const info = await transporter.sendMail({
            from: '"nodemailer" <masdimthi6@gmail.com>', // Sender address
            to: email, // Recipient email
            subject: "Password Reset Request", // Subject line
            text: `You requested a password reset. Click the link to reset your password: ${resetLink}`, // Plain text body
            html: `<p>You requested a password reset. Click the link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`, // HTML body
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error); // Log any errors
    }
}

// Example usage
const resetLink = "http://localhost:5000/reset-password/token"; // Example reset link
sendPasswordResetEmail("user@example.com", resetLink); // Call the function with an example email
