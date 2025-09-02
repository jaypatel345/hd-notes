// src/controllers/noteController.ts
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Note } from '../models/Note';
import { AuthenticatedRequest } from '../middleware/auth';

export const getNotes = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const notes = await Note.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      data: notes
    });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const createNote = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, content } = req.body;

    const note = new Note({
      title,
      content,
      userId: req.userId
    });

    await note.save();

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: note
    });
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const deleteNote = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const note = await Note.findOne({ _id: id, userId: req.userId });
    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'Note not found'
      });
    }

    await Note.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};