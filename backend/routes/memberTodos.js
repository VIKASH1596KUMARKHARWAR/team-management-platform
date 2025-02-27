const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo'); // Adjust the path as needed
const Team = require('../models/Team'); // Adjust the path as needed
const User = require('../models/User'); // Adjust the path as needed

// Get todos for a specific member
router.get('/:userId/todos', async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.params.userId });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific todo by its ID for a specific member
router.get('/:userId/todos/:todoId', async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.todoId, user: req.params.userId });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new todo for a specific member
router.post('/:userId/todos', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        completed: false,
        team: req.body.teamId, // Make sure to include teamId in the request body
        user: req.params.userId,
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a specific todo for a specific member
router.put('/:userId/todos/:todoId', async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.todoId, user: req.params.userId },
            req.body,
            { new: true }
        );
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a specific todo for a specific member
router.delete('/:userId/todos/:todoId', async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.todoId, user: req.params.userId });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
