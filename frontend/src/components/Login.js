import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { loginUser } from '../redux/actions/authActions'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const error = useSelector((state) => state.auth.error); 
    const loading = useSelector((state) => state.auth.loading);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await dispatch(loginUser(credentials));

        if (user) {
            // Check the user role and navigate accordingly
            if (user.role === 'admin') {
                navigate('/admin/dashboard'); // Admin dashboard route
            } else {
                navigate('/user/dashboard'); // User dashboard route
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>} 
            </form>
        </div>
    );
};

export default Login;
