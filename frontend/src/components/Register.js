import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions/authActions';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('team_member'); // Default to team_member
    const [loading, setLoading] = useState(false);
    const error = useSelector((state) => state.auth.error);
    const successMessage = useSelector((state) => state.auth.successMessage);

    const dispatch = useDispatch();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await dispatch(registerUser({ username, email, password, role }));
        } catch (err) {
            console.error('Registration error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Optional: Clear previous messages on component mount or before registering
    useEffect(() => {
        // Dispatch an action to clear previous messages if you implement that functionality
    }, []);

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="team_member"
                            checked={role === 'team_member'}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        Team Member
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="admin"
                            checked={role === 'admin'}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        Admin
                    </label>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
                {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </form>
        </div>
    );
};

export default Register;
