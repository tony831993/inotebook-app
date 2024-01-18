const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Thisisasample@JWTSecret';

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
            return res.status(400).json({ error: `User with given email "${req.body.email}" already exists.` });
        }
        const salt = await bcrypt.genSaltSync(10);
        const securePass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePass
        });
        if (user) {
            const userData = {
                user: user.id
            };
            const authToken = jwt.sign(userData, JWT_SECRET);
            res.json({
                success: `User "${user.email}" created successfuly.`,
                authToken
            });
        } else {
            res.status(500).json({ error: `Unable to create the user. Please try again later.` });
        }
    } catch (error) {
        console.error(`DB error: ${error.message}`);
        res.status(500).json({ error: `Internal server error.` });
    }
});

module.exports = router;