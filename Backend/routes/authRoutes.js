import express from 'express';
import { signup } from '../controllers/authController.js';


const router = express.Router();
//route for sign up
router.post('/signup', signup);

export default router