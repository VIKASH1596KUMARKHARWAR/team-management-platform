const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }, // Reference to Team
    createdAt: { type: Date, default: Date.now },
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
