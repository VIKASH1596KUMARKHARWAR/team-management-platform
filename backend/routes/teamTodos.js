const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo'); // Adjust the path as needed
const Team = require('../models/Team'); // Adjust the path as needed
const Document = require('../models/Document'); // Adjust the path as needed
const multer = require('multer');


// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder where files will be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Save file with a unique name
    },
});

const upload = multer({ storage });



// Get todos for a specific team
router.get('/:teamId/todos', async (req, res) => {
    try {
        const todos = await Todo.find({ team: req.params.teamId });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific todo by its ID for a specific team
router.get('/:teamId/todos/:todoId', async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.todoId, team: req.params.teamId });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new todo for a specific team
router.post('/:teamId/todos', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        completed: false,
        team: req.params.teamId,
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a specific todo for a specific team
router.put('/:teamId/todos/:todoId', async (req, res) => {
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



// Delete a specific todo for a specific team
router.delete('/:teamId/todos/:todoId', async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.todoId, team: req.params.teamId });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




// Upload a document for a specific team
// Upload a document for a specific team
router.post('/:teamId/documents', upload.single('document'), async (req, res) => {
    const { teamId } = req.params;

    // Check if the team exists
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    try {
        const document = new Document({
            filename: req.file.originalname,
            filePath: req.file.path,
            team: teamId,
            // Remove uploadedBy if not needed
            // uploadedBy: req.user.id, // No longer needed
        });

        const newDocument = await document.save();

        // Respond with the created document
        res.status(201).json({
            message: 'File uploaded successfully',
            document: newDocument // Send back the saved document
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get documents for a specific team
router.get('/:teamId/documents', async (req, res) => {
    try {
        const documents = await Document.find({ team: req.params.teamId });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;


