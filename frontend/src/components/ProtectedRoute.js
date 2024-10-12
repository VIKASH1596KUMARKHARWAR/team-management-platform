import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const role = user?.role; // Safely access role from user object
    console.log("ProtectedRoute:", { isAuthenticated, role }); // Debugging line

    // Check if user is authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Redirect based on user role
    if (allowedRoles.includes(role)) {
        return children; // Render the children (the protected component)
    } else {
        // Redirect users to their respective dashboards based on role
        if (role === 'admin') {
            return <Navigate to="/admin/dashboard" />;
        } else if (role === 'team_member') {
            return <Navigate to="/user/dashboard" />; // Redirect team_member to /user/dashboard
        }
    }

    return null; // Render nothing if role is not allowed
};

export default ProtectedRoute;
