import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Replace with your actual API endpoint
                const response = await axios.get('/api/user');
                console.log("Response from API:", response.data);

                const userData = response.data.user; // Accessing the user object directly
                if (userData) {
                    setUser(userData);
                } else {
                    console.error("User data is undefined");
                    setUser(null);
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []); // Empty dependency array means this runs once when the component mounts

    if (loading) {
        return <h1>Loading...</h1>; // Show loading state
    }

    if (error) {
        return <h1>Error fetching user data: {error.message}</h1>; // Handle error state
    }

    return (
        <div>
            {user ? (
                <h1>Welcome, {user.username}!</h1> // Display user info
            ) : (
                <h1>No user data available.</h1> // Handle case where user is null
            )}
        </div>
    );
};

export default UserProfile;
