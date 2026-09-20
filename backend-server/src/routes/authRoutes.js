import express from 'express';
import { login, getMe } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public auth endpoints
router.post('/login', login);

// Protected session validation
router.get('/me', verifyToken, getMe);

export default router;
