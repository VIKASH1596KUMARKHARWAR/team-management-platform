import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddTeamMember = ({ onMemberAdded }) => {
    const [teams, setTeams] = useState([]); // State to store teams data
    const [members, setMembers] = useState([]); // State to store members data
    const [selectedTeamId, setSelectedTeamId] = useState(''); // Selected team ID
    const [selectedMemberId, setSelectedMemberId] = useState(''); // Selected member ID
    const [loading, setLoading] = useState(true); // Loading state
    const [submitting, setSubmitting] = useState(false); // Form submitting state
    const [error, setError] = useState(''); // State to store error messages

    const fetchTeamsAndMembers = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from local storage
            if (!token) {
                throw new Error('No authentication token found.');
            }

            // Fetch teams
            const teamsResponse = await axios.get('http://localhost:5000/api/teams', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTeams(teamsResponse.data);

            // Fetch members
            const membersResponse = await axios.get('http://localhost:5000/api/teams/allMembers', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMembers(membersResponse.data);
        } catch (error) {
            console.error('Error fetching teams or members:', error);
            setError('Failed to load teams or members. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeamsAndMembers();
    }, []);

    const handleAddMember = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found.');
            }

            const response = await axios.post('http://localhost:5000/api/teams/add-member', {
                teamId: selectedTeamId,
                userId: selectedMemberId,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.message === 'Member added successfully') {
                alert('Member added successfully!');
                onMemberAdded();
                setSelectedTeamId('');
                setSelectedMemberId('');
            } else {
                throw new Error('Unexpected response from the server.');
            }
        } catch (error) {
            console.error('Error adding member:', error);
            setError('Failed to add member. Please check the team and member selection.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="add-team-member-container">
            <h2>Add Team Member</h2>
            {loading ? (
                <p>Loading data...</p>
            ) : (
                <form className="team-member-form" onSubmit={handleAddMember}>
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="team">Select Team:</label>
                        <select
                            id="team"
                            value={selectedTeamId}
                            onChange={(e) => setSelectedTeamId(e.target.value)}
                            required
                            className="form-control"
                        >
                            <option value="">Select a team</option>
                            {teams.map((team) => (
                                <option key={team._id} value={team._id}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="member">Select Member:</label>
                        <select
                            id="member"
                            value={selectedMemberId}
                            onChange={(e) => setSelectedMemberId(e.target.value)}
                            required
                            className="form-control"
                        >
                            <option value="">Select a member</option>
                            {members.map((member) => (
                                <option key={member._id} value={member._id}>
                                    {member.username} - {member.email} ({member.role})
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="submit-btn" disabled={submitting}>
                        {submitting ? 'Adding Member...' : 'Add Member'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default AddTeamMember;
