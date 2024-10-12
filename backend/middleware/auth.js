const jwt = require('jsonwebtoken');

// Middleware to verify JWT token and extract user info
exports.authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Split to get the token after 'Bearer'

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Adds the user info to the request
        next();
    } catch (error) {
        console.error('Token verification error:', error.message); // Log the error for debugging
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

// Middleware to restrict access based on roles
exports.roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        // Check if the user role exists and matches the required role
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({ message: `${requiredRole.charAt(0).toUpperCase() + requiredRole.slice(1)} access required` });
        }
        next();
    };
};

// Admin-specific middleware using roleMiddleware
exports.adminMiddleware = exports.roleMiddleware('admin');

// Optionally, you can also create a role-checking middleware for multiple roles
exports.rolesMiddleware = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Access denied for role: ${req.user.role}` });
        }
        next();
    };
};
