import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const TodoList = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state
    const fileInputRef = useRef(null); // Ref for file input
    const navigate = useNavigate(); // Initialize useNavigate

    // Fetch all teams when the component mounts
    useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true); // Start loading
            try {
                const response = await axios.get('http://localhost:5000/api/teams');
                setTeams(response.data);
            } catch (error) {
                console.error('Error fetching teams:', error);
            } finally {
                setLoading(false); // End loading
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

    const handleFileUpload = async (teamId) => {
        if (!fileInputRef.current) {
            fileInputRef.current = document.createElement('input');
            fileInputRef.current.type = 'file';
            fileInputRef.current.accept = '.pdf, .doc, .docx, .txt'; // Accepting common document types
        }

        fileInputRef.current.onchange = async (event) => {
            const file = event.target.files[0];

            if (file) {
                const formData = new FormData();
                formData.append('document', file);

                try {
                    const response = await axios.post(`http://localhost:5000/api/${teamId}/documents`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    alert(`File uploaded successfully: ${response.data.document.filename}`); // Use response.data.document
                } catch (error) {
                    console.error('Error uploading file:', error);
                    alert('Failed to upload file. Please try again.');
                }
            } else {
                alert('Please select a file to upload.');
            }
        };

        fileInputRef.current.click(); // Trigger the file input dialog
    };

    return (
        <div>
            <h2>Team List</h2>
            {loading ? ( // Show loading state
                <p>Loading teams...</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left', border: '1px solid #ddd', padding: '8px' }}>Team Name</th>
                            <th style={{ textAlign: 'left', border: '1px solid #ddd', padding: '8px' }}>Members</th>
                            <th style={{ textAlign: 'left', border: '1px solid #ddd', padding: '8px' }}>Actions for Team</th>
                            <th style={{ textAlign: 'left', border: '1px solid #ddd', padding: '8px' }}>Actions for Members</th>
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
                                                        style={{ marginRight: '10px' }}
                                                    >
                                                        View Todos
                                                    </button>
                                                    <button 
                                                        onClick={() => handleAddTodo(team._id)} 
                                                        style={{ marginLeft: '10px' }}
                                                    >
                                                        Add Todo
                                                    </button>
                                                    <button 
                                                        onClick={() => handleFileUpload(team._id)} 
                                                        style={{ marginLeft: '10px' }}
                                                    >
                                                        Upload Document
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
            )}
        </div>
    );
};

export default TodoList;
