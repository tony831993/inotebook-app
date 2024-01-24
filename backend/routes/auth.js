const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');

const JWT_SECRET = 'Thisisasample@JWTSecret';

// Create a user using: POST "/api/auth/create_user". No login required
router.post('/create_user', [
    body('name', 'Invalid name provided.').isLength({ min: 3 }),
    body('email', 'Invalid email provided.').isEmail(),
    body('password', 'Password must be atleast 5 characters.').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ success, message: errors.array() });
    }
    try {
        // Check for existing user email in DB.
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, message: `User with given email "${req.body.email}" already exists.` });
        }
        const salt = await bcrypt.genSaltSync(10);
        const securePass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePass
        });
        if (user) {
            const payload = {
                user: {
                    id: user.id
                }
            }
            success = true;
            const authToken = jwt.sign(payload, JWT_SECRET);
            res.json({
                success,
                message: `User "${user.email}" created successfuly.`,
                authToken
            });
        } else {
            res.status(500).json({ success, message: `Unable to create the user. Please try again later.` });
        }
    } catch (error) {
        console.error(`DB error: ${error.message}`);
        res.status(500).json({ error: `Internal server error.` });
    }
});

// Login user using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Invalid email provided.').isEmail(),
    body('password', 'Password cannot be blank.').exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ success, message: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            const comparePass = await bcrypt.compare(password, user.password);
            if (comparePass) {
                const payload = {
                    user: {
                        id: user.id
                    }
                }
                success = true;
                const authToken = jwt.sign(payload, JWT_SECRET);
                res.json({
                    success,
                    message: `Login successful.`,
                    authToken
                });
            } else {
                return res.status(400).json({ success, message: `Provided email and password doesn't match. Please use correct email or password.` });
            }
        } else {
            return res.status(400).json({ success, message: `Provided email and password doesn't match. Please use correct email or password.` });
        }
    } catch (error) {
        console.error(`login error: ${error.message}`);
        res.status(500).json({ success, message: `Internal server error.` });
    }
});


// Get logged in user details using: POST "/api/auth/get_user". login required
router.post('/get_user', fetchuser, async (req, res) => {
    try {
        let success = false;
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        if (user) {
            success = true;
            res.json({
                success,
                message: 'User fetched successfully.',
                data: user
            });
        } else {
            return res.status(400).json({ success, message: `User doesn't exist.` });
        }
    } catch (error) {
        console.error(`getuser error: ${error.message}`);
        res.status(500).json({ error: `Internal server error.` });
    }
});
module.exports = router;