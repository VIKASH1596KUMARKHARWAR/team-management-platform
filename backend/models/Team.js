const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Ensure name is required
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
