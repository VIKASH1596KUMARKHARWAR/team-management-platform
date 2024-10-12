const Todo = require('../models/Todo');
const Team = require('../models/Team');
const mongoose = require('mongoose');

// Create a new todo
exports.createTodo = async (req, res) => {
    const { title, description, team } = req.body;

    try {
        const todo = new Todo({ title, description, team });
        await todo.save();
        res.status(201).json({ message: 'Todo created successfully', todo });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error while creating todo' });
    }
};

// Get all todos (for a specific team or all todos)
exports.getTodos = async (req, res) => {
    const { teamId } = req.query;  // Query parameter to filter by team

    try {
        const todos = teamId 
            ? await Todo.find({ team: teamId }).populate('team') 
            : await Todo.find().populate('team');

        res.json(todos);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error while fetching todos' });
    }
};

// Get a specific todo by ID
exports.getTodoById = async (req, res) => {
    const { todoId } = req.params;  // Extract the ID from the URL params

    try {
        // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(todoId)) {
            return res.status(400).json({ message: 'Invalid To-do ID format' });
        }

        const todo = await Todo.findById(todoId).populate('team');
        if (!todo) {
            return res.status(404).json({ message: 'To-do not found' });
        }

        res.json(todo);
    } catch (error) {
        console.error("Error fetching To-do:", error);  // Log the full error for better debugging
        res.status(500).json({ message: 'Server error while fetching the to-do item' });
    }
};
// Update a todo
exports.updateTodo = async (req, res) => {
    const { todoId } = req.params;
    const updates = req.body;

    try {
        const todo = await Todo.findByIdAndUpdate(todoId, updates, { new: true });
        if (!todo) return res.status(404).json({ message: 'Todo not found.' });

        res.json({ message: 'Todo updated successfully', todo });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error while updating todo' });
    }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
    const { todoId } = req.params;
    const { userId } = req.body; // Get the user ID from the request body

    try {
        // Check if the todo exists
        const todo = await Todo.findById(todoId).populate('team');
        if (!todo) return res.status(404).json({ message: 'Todo not found.' });

        // Check if the user is authorized to delete this todo
        if (todo.team && todo.team.members.includes(userId)) {
            // Use findByIdAndDelete to remove the todo
            await Todo.findByIdAndDelete(todoId);
            return res.json({ message: 'Todo deleted successfully' });
        } else {
            return res.status(403).json({ message: 'You are not authorized to delete this todo.' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error while deleting todo' });
    }
};


// Get all teams
// Get all to-dos for a specific team
exports.getTeams = async (req, res) => {
    try {
        // Fetch all teams and populate the members with selected fields: username, email, and role
        const teams = await Team.find().populate('members', 'username email role');
        
        // Respond with the teams and their populated members
        res.json(teams);
    } catch (error) {
        console.error(error.message);
        // Send a 500 status in case of a server error
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a team by ID
exports.getTeamById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const team = await Team.findById(id).populate('members', 'username email role');
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        res.json(team);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find().populate('members', 'username email role'); // Populate with selected fields
        res.json(teams);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
}; 