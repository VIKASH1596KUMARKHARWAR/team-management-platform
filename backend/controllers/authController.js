// authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// authController.js
// exports.register = async (req, res) => {
//     const { username, email, password, role } = req.body;

//     try {
//         // Check if user already exists by email
//         const userExists = await User.findOne({ email });
//         if (userExists) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Check if username already exists
//         const usernameExists = await User.findOne({ username });
//         if (usernameExists) {
//             return res.status(400).json({ message: 'Username already exists' });
//         }

//         // Create new user
//         const user = new User({ 
//             username, 
//             email, 
//             password, 
//             role: role || 'team_member' // Default role to team_member
//         });

//         // Save user to the database
//         await user.save();

//         // Include user details in the response if needed
//         res.status(201).json({ 
//             message: 'User created successfully',
//             user: { 
//                 id: user._id, 
//                 username: user.username, 
//                 email: user.email, 
//                 role: user.role 
//             } // Optional user data
//         });
//     } catch (error) {
//         // Handle MongoDB duplicate key error (11000)
//         if (error.code === 11000) {
//             return res.status(400).json({ message: 'Username or email already exists' });
//         }

//         // Log the error for debugging
//         console.error('Registration error:', error.message);

//         // Send a generic server error message
//         res.status(500).json({ message: 'Server error', error: error.message }); // Include error message for debugging purposes
//     }
// };

exports.register = async (req, res) => {
    console.log('Request Body:', req.body); // Log incoming data
    const { username, email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const user = new User({ username, email, password, role: role || 'team_member' });
        await user.save();
        res.status(201).json({ 
            message: 'User created successfully',
            user: { id: user._id, username: user.username, email: user.email, role: user.role } // Optional user data
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        console.error('Registration error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            user: { id: user._id, username: user.username, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
