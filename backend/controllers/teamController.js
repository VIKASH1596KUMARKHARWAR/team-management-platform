const Team = require('../models/Team');
const User = require('../models/User');

// Create a new team
exports.createTeam = async (req, res) => {
    const { name } = req.body; // Extract team name from request body

    // Check if name is provided
    if (!name) {
        return res.status(400).json({ message: 'Team name is required.' });
    }

    try {
        const existingTeam = await Team.findOne({ name });
        if (existingTeam) {
            return res.status(400).json({ message: 'Team with this name already exists.' });
        }

        const team = new Team({ name });
        await team.save();
        res.status(201).json({ message: 'Team created successfully', team });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all teams along with their members
exports.getTeams = async (req, res) => {
    try {
        const teams = await Team.find().populate('members', 'username email role'); // Populate with selected fields
        res.json(teams);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a member to a team
exports.addMember = async (req, res) => {
    const { teamId, userId } = req.body;

    try {
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: 'Team not found.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if user is already a member
        if (team.members.includes(userId)) {
            return res.status(400).json({ message: 'User is already a member of this team.' });
        }

        team.members.push(userId);
        await team.save();
        res.json({ message: 'Member added successfully', team });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Remove a member from a team
const mongoose = require('mongoose');

exports.removeMember = async (req, res) => {
    console.log("Received request to remove member:", req.body); // Log the incoming request

    const { teamId, userId } = req.body;

    // Validate teamId
    if (!mongoose.Types.ObjectId.isValid(teamId)) {
        console.log("Invalid teamId:", teamId); // Log invalid teamId
        return res.status(400).json({ message: 'Invalid team ID.' });
    }

    try {
        const team = await Team.findById(teamId);
        if (!team) {
            console.log("Team not found:", teamId); // Log if team not found
            return res.status(404).json({ message: 'Team not found.' });
        }

        const userIndex = team.members.indexOf(userId);
        if (userIndex === -1) {
            console.log("User not found in team members:", userId); // Log if user not found in team
            return res.status(400).json({ message: 'User is not a member of this team.' });
        }

        team.members.splice(userIndex, 1);
        await team.save();
        console.log("Member removed successfully:", userId); // Log successful removal
        res.json({ message: 'Member removed successfully', team });
    } catch (error) {
        console.error("Error removing member:", error.message); // Log the error message
        res.status(500).json({ message: 'Server error' });
    }
};


// Delete a team
// Delete a team
// Delete a team
// Delete a team

exports.deleteTeam = async (req, res) => {
    const { teamId } = req.params;

    // Validate teamId
    if (!mongoose.Types.ObjectId.isValid(teamId)) {
        console.log("Invalid teamId:", teamId); // Log invalid teamId
        return res.status(400).json({ message: 'Invalid team ID.' });
    }

    try {
        const team = await Team.findByIdAndDelete(teamId);
        if (!team) {
            console.log("Team not found:", teamId); // Log if team not found
            return res.status(404).json({ message: 'Team not found.' });
        }

        console.log("Team deleted successfully:", teamId); // Log successful deletion
        res.json({ message: 'Team deleted successfully' });
    } catch (error) {
        console.error("Error deleting team:", error.message); // Log the error message
        res.status(500).json({ message: 'Server error' });
    }
};


// Get all teams along with their members
exports.getTeamsWithMembers = async (req, res) => {
    try {
        const teams = await Team.find().populate('members', 'username email role'); // Populate with selected fields
        res.json(teams);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};



// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.json(users); // Send users as a response
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};


// Delete a member from a team

// Remove a member from a team

// const mongoose = require('mongoose');

// exports.removeMemberFromTeam = async (req, res) => {
//     const { teamId, memberId } = req.params;

//     try {
//         // Log the incoming teamId and memberId
//         console.log("Incoming Request - teamId:", teamId, "memberId:", memberId);

//         // Ensure the teamId and memberId are valid ObjectIds
//         if (!mongoose.Types.ObjectId.isValid(teamId) || !mongoose.Types.ObjectId.isValid(memberId)) {
//             console.log(`Invalid teamId or memberId: teamId=${teamId}, memberId=${memberId}`);
//             return res.status(400).json({ message: 'Invalid teamId or memberId.' });
//         }

//         // Find the team by ID
//         const team = await Team.findById(teamId);

//         if (!team) {
//             console.log(`Team with ID ${teamId} not found.`);
//             return res.status(404).json({ message: 'Team not found.' });
//         }

//         // Log the found team
//         console.log("Found team:", team);

//         // Check if the member is part of the team by comparing ObjectIds
//         const memberExists = team.members.some(member =>
//             member._id.toString() === memberId
//         );

//         // Log the member existence check
//         console.log("Is member part of the team:", memberExists);

//         if (!memberExists) {
//             console.log(`Member with ID ${memberId} is not part of the team.`);
//             return res.status(400).json({ message: 'User is not a member of this team.' });
//         }

//         // Remove the member from the team
//         team.members = team.members.filter(member =>
//             member._id.toString() !== memberId
//         );

//         // Save the updated team
//         await team.save();

//         // Log success message
//         console.log(`Member with ID ${memberId} removed from team ${teamId}.`);

//         res.json({ message: 'Member removed successfully.' });
//     } catch (error) {
//         console.error("Error occurred:", error);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };



exports.removeMemberFromTeam = async (req, res) => {
    const { teamId, memberId } = req.params; // Get teamId and memberId from route parameters

    try {
        // Log the incoming teamId and memberId
        console.log("Incoming Request - teamId:", teamId, "memberId:", memberId);

        // Ensure the teamId and memberId are valid ObjectIds
        if (!mongoose.Types.ObjectId.isValid(teamId) || !mongoose.Types.ObjectId.isValid(memberId)) {
            console.log(`Invalid teamId or memberId: teamId=${teamId}, memberId=${memberId}`);
            return res.status(400).json({ message: 'Invalid teamId or memberId.' });
        }

        // Find the team by ID
        const team = await Team.findById(teamId);
        if (!team) {
            console.log(`Team with ID ${teamId} not found.`);
            return res.status(404).json({ message: 'Team not found.' });
        }

        // Log the found team
        console.log("Found team:", team);

        // Check if the member is part of the team
        const memberExists = team.members.some(member => member.toString() === memberId);
        console.log("Is member part of the team:", memberExists);
        
        if (!memberExists) {
            console.log(`Member with ID ${memberId} is not part of the team.`);
            return res.status(400).json({ message: 'User is not a member of this team.' });
        }

        // Remove the member from the team
        team.members = team.members.filter(member => member.toString() !== memberId);
        await team.save(); // Save the updated team

        // Log success message
        console.log(`Member with ID ${memberId} removed from team ${teamId}.`);
        res.json({ message: 'Member removed successfully.' });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};