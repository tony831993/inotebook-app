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
        res.json({ success: 'Saved successfully.', response: savedNote });
    } catch (error) {
        console.error(`API - add_note error: ${error.message}`);
        res.status(500).json({ error: `Internal server error.` });
    }
});

// Update a existing note using: PUT "/api/notes/update_note". login required
router.put('/update_note/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Data not found." });
        } else if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Unauthorized. Action not allowed." });
        } else {
            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        }

        res.json({ success: 'Note udpated successfully.', response: note });
    } catch (error) {
        console.error(`API - update_note error: ${error.message}`);
        res.status(500).json({ error: `Internal server error.` });
    }
});

// Delete a note using: DELETE "/api/notes/delete_note". login required
router.delete('/delete_note/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Data not found." });
        } else if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Unauthorized. Action not allowed." });
        } else {
            note = await Note.findByIdAndDelete(req.params.id);
        }
        res.json({ success: 'Note deleted successfully.' });
    } catch (error) {
        console.error(`API - delete_note error: ${error.message}`);
        res.status(500).json({ error: `Internal server error.` });
    }
});

module.exports = router;