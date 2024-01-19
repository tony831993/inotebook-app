const express = require('express');
const fetchuser = require('../middleware/fetchUser');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Get all notes using: GET "/api/notes/fetchAllNotes". login required
router.get('/fetch_all_notes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.send(notes);
    } catch (error) {
        console.error(`API - fetch_all_notes error: ${error.message}`);
        res.status(500).json({ error: `Internal server error.` });
    }
});

// Add new note using: POST "/api/notes/add_note". login required
router.post('/add_note', fetchuser, [
    body('title', 'Title can\'t be empty and should have atleast 3 characters').isLength({ min: 3 }),
    body('description', 'Description can\'t be empty and should have atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: `Bad request - ${errors.message}` });
        }
        const { title, description, tag } = req.body;
        const note = new Note({
            title, description, tag, user: req.user.id
        });

        const savedNote = await note.save();
        res.json({ success: 'Note saved successfully.' });
    } catch (error) {
        console.error(`API - add_note error: ${error.message}`);
        res.status(500).json({ error: `Internal server error.` });
    }
});

module.exports = router;