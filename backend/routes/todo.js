const express = require('express');
const {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
    getTodoById,
    
    getTeamById,
    getTeams,
    getAllTeams,
    getTodosByTeam
} = require('../controllers/todoController');

const router = express.Router();

// Todo Routes
router.post('/', createTodo); // Create a todo
router.get('/', getTodos); // Get all todos (optionally filtered by team)
router.get('/:todoId', getTodoById); // Get a todo by its ID
router.put('/:todoId', updateTodo); // Update a todo
router.delete('/:todoId', deleteTodo); // Delete a todo

// Team Routes
router.get('/teams', getAllTeams); // Get all teams
router.get('/teams/:id', getTeamById); // Get team by ID

module.exports = router;
