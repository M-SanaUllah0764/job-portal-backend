const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('User registration error:', err);
        res.status(500).json({ message: 'Registration failed' });
    }
};

// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.error('User not found:', email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password match
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            console.error('Password mismatch for user:', email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT payload
        const payload = {
            user: { id: user.id },
        };

        // Sign the token
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '48h' }, (err, token) => {
            if (err) {
                console.error('Token sign error:', err);
                return res.status(500).json({ message: 'Token generation failed' });
            }
            // Send response with token
            res.json({
                token,
                message: 'Login successful',
            });
        });
    } catch (err) {
        console.error('Login error:', err.message || err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


