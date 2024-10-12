import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams, createNewTeam, deleteTeam } from '../redux/actions/teamActions';
import AddTeamMember from './AddTeamMember';
import TeamMembers from './TeamMembers';
import 'bootstrap/dist/css/bootstrap.min.css';

const TeamManagement = () => {
    const dispatch = useDispatch();
    const { teams, loading, error } = useSelector((state) => state.team);
    const [teamName, setTeamName] = useState('');

    useEffect(() => {
        fetchTeamData();
    }, [dispatch]);

    const fetchTeamData = async () => {
        await dispatch(fetchTeams());
    };

    const handleCreateTeam = async (e) => {
        e.preventDefault();
        if (teamName.trim()) {
            try {
                await dispatch(createNewTeam({ name: teamName }));
                setTeamName('');
                fetchTeamData();
            } catch (error) {
                alert("Failed to create team. Please try again.");
            }
        } else {
            alert("Team name cannot be empty");
        }
    };

    const handleDeleteTeam = async (teamId) => {
        if (window.confirm("Are you sure you want to delete this team?")) {
            await dispatch(deleteTeam(teamId));
            fetchTeamData();
        }
    };

    const handleMemberDeleted = () => {
        fetchTeamData();
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-danger">Error: {error}</div>;

    return (
        <div className="container mt-4">
            <h2 className="text-center">Team Management</h2>
            <form onSubmit={handleCreateTeam} className="mb-4">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="Team Name"
                        required
                    />
                    <button type="submit" className="btn btn-primary">Create Team</button>
                </div>
            </form>

            <h3>Existing Teams</h3>
            <div className="row">
                {teams.map((team) => (
                    <div key={team._id} className="col-md-4 mb-4">
                        <div className="card equal-height-card">
                            <div className="card-body">
                                <h5 className="card-title d-flex justify-content-between align-items-center">
                                    {team.name}
                                    <button 
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteTeam(team._id)}>
                                        Delete
                                    </button>
                                </h5>
                                <TeamMembers
                                    teamId={team._id}
                                    members={team.members}
                                    onMemberDeleted={handleMemberDeleted}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <AddTeamMember onMemberAdded={fetchTeamData} />
        </div>
    );
};

export default TeamManagement;
