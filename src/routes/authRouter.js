import express from 'express'
import { loginValidator } from '../validators/authValidator.js';
import { loginController } from '../controllers/userController.js';
const router = express.Router();

router.post('/login',loginValidator,loginController);

export default router