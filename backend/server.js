const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const teamTodos = require('./routes/teamTodos'); // Import the new route
const memberTodos = require('./routes/memberTodos'); // Import the new route
const document= require('./routes/document'); // Import the new route

dotenv.config();
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/teams', require('./routes/team'));
app.use('/api/todos', require('./routes/todo'));
app.use('/api', teamTodos); // Use the merged team and todo route
app.use('/api', memberTodos); // Use the member todo route
app.use('/api', document); // Use the member todo route

app.use('/api', require('./routes/role')); // Role-based routes (admin and team member)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
