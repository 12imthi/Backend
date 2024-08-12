import express from 'express';
import { registerUser, loginUser, getuser ,} from '../controllers/userController.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
// router.post('/forgot-password', requestPasswordReset); // Route for requesting a password reset
// router.post('/reset-password', resetPassword); // Route for resetting the password
router.get('/user', authMiddleware, getuser);

export default router;
