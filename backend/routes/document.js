// routes/document.js
const express = require('express');
const multer = require('multer');
const Document = require('../models/Document'); // Adjust the path as needed
// const authMiddleware = require('../middleware/authMiddleware');
const Team = require('../models/Team'); // Adjust the path as needed
const router = express.Router();

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

// Upload a document (only team members can upload)
router.post('/:teamId/documents',  upload.single('document'), async (req, res) => {
    const { teamId } = req.params;

    // Check if the user is part of the team
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    const isMember = team.members.includes(req.user.id); // Assuming team members are stored in an array in the team document
    if (!isMember) return res.status(403).json({ message: 'Only team members can upload documents' });

    try {
        const document = new Document({
            filename: req.file.originalname,
            filePath: req.file.path,
            team: teamId,
            uploadedBy: req.user.id,
        });
        
        const newDocument = await document.save();
        res.status(201).json(newDocument);
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
