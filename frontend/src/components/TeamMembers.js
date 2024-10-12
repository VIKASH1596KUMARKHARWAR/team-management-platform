import React from 'react';
import axios from 'axios';

const TeamMembers = ({ teamId, members, onMemberDeleted }) => {
    // Handle member deletion
    const handleDeleteMember = async (memberId) => {
        if (window.confirm("Are you sure you want to remove this member?")) {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from local storage
                
                // Use a DELETE request with params for member ID
                await axios.delete(`http://localhost:5000/api/teams/remove-member/${teamId}/${memberId}`, {
                    headers: { Authorization: `Bearer ${token}` }, // Include token for authorization
                });
                
                alert('Member removed successfully!');

                // Refresh team data after deletion
                onMemberDeleted(); // Callback to refresh the team members
            } catch (error) {
                console.error('Error removing member:', error);
                alert('Failed to remove member.');
            }
        }
    };

    return (
        <div>
            <h5>Members ({members.length})</h5> {/* Display total member count */}
            <ul>
                {members.map((member) => (
                    <li key={member._id}>
                        {member.username} - {member.email}
                        <button onClick={() => handleDeleteMember(member._id)}>Remove</button> {/* Trigger delete on button click */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeamMembers;
