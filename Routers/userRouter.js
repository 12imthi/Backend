import express from "express";
import { loginUser, registerUser} from "../Controllers/userController.js";
// import { ,forgotPassword,resetPassword } from "../Controllers/userController.js";


const router = express.Router();

router.post('/register-user',registerUser)
router.post('/login-user',loginUser)
// router.get('/home',getuser)

// router.post('/forgot-password', forgotPassword);
// router.post('/reset-password/:token', requestPasswordReset
// );


export default router;