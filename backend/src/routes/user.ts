import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { getProfile } from '../controllers/userController';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.get('/profile', getProfile);

export default router;