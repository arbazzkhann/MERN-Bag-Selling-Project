import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/verify', userController.verifyUserToken);


export default router;