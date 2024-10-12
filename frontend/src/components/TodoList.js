import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const TodoList = () => {
    const [teams, setTeams] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    // Fetch all teams when the component mounts
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/teams');
                setTeams(response.data);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        fetchTeams();
    }, []);

    const handleMemberView = (memberId) => {
        navigate(`/member/${memberId}/todos`); // Redirect to MemberTodos component
    };


    const handleViewTodos = (teamId) => {
        navigate(`/team/${teamId}/todos`); // Redirect to TeamTodos component
    };

    const handleAddTodo = async (teamId) => {
        const title = prompt("Enter todo title:");
        const description = prompt("Enter todo description:");

        if (title && description) {
            try {
                const response = await axios.post(`http://localhost:5000/api/${teamId}/todos`, { title, description });
                alert(`Todo added: ${response.data.title}`); // Alert on successful addition
            } catch (error) {
                console.error('Error adding todo:', error);
                alert('Failed to add todo. Please try again.');
            }
        } else {
            alert('Both title and description are required to add a todo.');
        }
    };

    

    return (
        <div>
            <h2>Team List</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', border: '1px solid #ddd', padding: '8px' }}>Team Name</th>
                        <th style={{ textAlign: 'left', border: '1px solid #ddd', padding: '8px' }}>Members</th>
                        <th style={{ textAlign: 'left', border: '1px solid #ddd', padding: '8px' }}>Actions for Team</th>
                        <th style={{ textAlign: 'left', border: '1px solid #ddd', padding: '8px' }}>Actions for Members</th> {/* New column for member actions */}
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team) => (
                        <React.Fragment key={team._id}>
                            {team.members.map((member, index) => (
                                <tr key={member._id}>
                                    {index === 0 && ( // Display team name and actions only for the first member
                                        <>
                                            <td rowSpan={team.members.length} style={{ border: '1px solid #ddd', padding: '8px' }}>{team.name}</td>
                                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{member.username}</td>
                                            <td rowSpan={team.members.length} style={{ textAlign: 'center', border: '1px solid #ddd', padding: '8px' }}>
                                                <button 
                                                    onClick={() => handleViewTodos(team._id)} 
                                                    style={{ marginRight: '10px' }} // Add space between buttons
                                                >
                                                    View Todos
                                                </button>
                                                <button 
                                                    onClick={() => handleAddTodo(team._id)} 
                                                    style={{ marginLeft: '10px' }} // Add space between buttons
                                                >
                                                    Add Todo
                                                </button>
                                            </td>
                                        </>
                                    )}
                                    {index !== 0 && ( // Display only the member username for other rows
                                        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{member.username}</td>
                                    )}
                                    {/* New Actions for Members column */}
                                    <td style={{ textAlign: 'center', border: '1px solid #ddd', padding: '8px' }}>
                                        <button onClick={() => handleMemberView(member._id)} style={{ marginRight: '5px' }}>
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {/* Line separator for each team */}
                            <tr>
                                <td colSpan={4} style={{ borderBottom: '2px solid #000', height: '10px' }}></td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TodoList;
