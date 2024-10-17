import express from 'express';
import { signup, login, logout, getProfile } from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// Signup
router.post('/signup', signup);

// Login
router.post('/login', login);

// Logout
router.get('/logout',isAuthenticated, logout);

// Get User Profile
router.get('/me', isAuthenticated, getProfile);

export default router;
