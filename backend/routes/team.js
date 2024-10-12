const express = require('express');
const {
    createTeam,
    getTeams,
    addMember,
    removeMember,
    deleteTeam,
    getAllUsers,
    getTeamsWithMembers,
    deleteTeamMember,
    removeMemberFromTeam, // Ensure this is imported correctly
} = require('../controllers/teamController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', getTeams); // Get all teams
// Protect all routes
router.use(authMiddleware);

// Admin-only routes
router.post('/', adminMiddleware, createTeam); // Create a team
router.post('/add-member', adminMiddleware, addMember); // Add member to team
// router.post('/remove-member', adminMiddleware, removeMember); // Remove member from team
router.delete('/:teamId', adminMiddleware, deleteTeam); // Delete a team
router.get('/teamMembers', adminMiddleware, getTeamsWithMembers); // Get teams with members
router.get('/allMembers', adminMiddleware, getAllUsers); // Get all users
router.delete('/:teamId/members/:memberId', adminMiddleware, removeMemberFromTeam); // Delete a member from a team
router.delete('/remove-member/:teamId/:memberId', adminMiddleware,removeMemberFromTeam);

module.exports = router;
