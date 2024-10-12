const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Route protected for 'admin' role
router.get('/admin-only', authMiddleware, roleMiddleware('admin'), (req, res) => {
    res.status(200).json({ message: 'Welcome Admin!' });
});

// Example for 'team_member' role
router.get('/team-only', authMiddleware, roleMiddleware('team_member'), (req, res) => {
    res.status(200).json({ message: 'Welcome Team Member!' });
});

module.exports = router;
