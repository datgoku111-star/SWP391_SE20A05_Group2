// server/routes/authRoutes.js
import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

// Định nghĩa đường dẫn POST: http://localhost:5000/api/auth/login
router.post('/login', authController.login);

export default router;