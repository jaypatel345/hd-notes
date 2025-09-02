// src/routes/notes.ts
import express from 'express';
import { body } from 'express-validator';
import { authenticateToken } from '../middleware/auth';
import {
  getNotes,
  createNote,
  deleteNote
} from '../controllers/noteController';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Validation middleware
const noteValidation = [
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title must be between 1-200 characters'),
  body('content').trim().isLength({ min: 1, max: 5000 }).withMessage('Content must be between 1-5000 characters')
];

// Routes
router.get('/', getNotes);
router.post('/', noteValidation, createNote);
router.delete('/:id', deleteNote);

export default router;