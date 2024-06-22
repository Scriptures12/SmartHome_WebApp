import express from 'express';
import { signin, signup } from '../controllers/authController.js';


const router = express.Router();
//route for sign up
router.post('/signup', signup);
router.post('/signin', signin);

export default router