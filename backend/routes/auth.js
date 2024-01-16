const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Invalid name provided.').isLength({ min: 3 }),
    body('email', 'Invalid email provided.').isEmail(),
    body('password', 'Password must be atleast 5 characters.').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.send({ errors: errors.array() });
    }
    // User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // }).then((user) => {
    //     res.json(user);
    // }).catch((err) => {
    //     console.log(err);
    //     res.json({
    //         error: 'Email provided already exist. Pleae enter a unique value.',
    //         message: err.message
    //     });
    // });
    try {
        // Check for existing user email in DB.
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'User with given email already exists.' });
        }
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        if (user) {
            res.json({ success: `User "${user.email}" created successfuly.` });
        } else {
            res.status(500).json({ error: `Unable to create the user. Please try again later.` });
        }
    } catch (error) {
        console.error(`DB error: ${error.message}`);
        res.status(500).json({ error: `Internal server error.` });
    }
});

module.exports = router;