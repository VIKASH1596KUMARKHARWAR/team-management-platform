// Document.js model (adjust based on your file structure)
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // Remove the 'required' field or set it to false
        // required: true, // Remove this line
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Document', documentSchema);
