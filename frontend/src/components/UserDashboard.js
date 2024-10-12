import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserTeams = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user/teams');
                setTeams(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserTeams();
    }, []);

    if (loading) return <p>Loading teams...</p>;
    if (error) return <p>Error fetching teams: {error}</p>;

    return (
        <div className="user-dashboard">
            <h1>Your Teams</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Team Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team) => (
                        <tr key={team._id}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{team.name}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                <Link to={`/team/${team._id}/todo`}>Manage To-Do List</Link> | 
                                <Link to={`/team/${team._id}/documents`}>Upload Documents</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserDashboard;
