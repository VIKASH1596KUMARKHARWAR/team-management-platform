const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true // Ensure username is unique
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please enter a valid email address'
        },
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 6 // Minimum password length
    },
    role: { 
        type: String, 
        enum: ['admin', 'team_member'], 
        default: 'team_member' 
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Pre-save hook to hash password
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare password during login
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
