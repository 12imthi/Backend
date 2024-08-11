import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true   // Ensures email is unique
    },
    password: {
        type: String,
        required: true
    },
    token : {
        type: String,
    },
    resetPasswordToken: {
        type: String,
        default: null   // Default can be set to null for better readability
    },
    resetPasswordExpires: {
        type: Date,
        default: null   // Similarly, default to null
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Exporting the User model
export default mongoose.model('User', userSchema);
