import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TeamManagement from './TeamManagement';
import { fetchTeams } from '../redux/actions/teamActions';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    
    const { Allteams, loading, error } = useSelector((state) => state.team);
    const user = useSelector((state) => state.auth.user); // Assuming user details are stored in auth state

    useEffect(() => {
        fetchTeamData(); // Fetch teams on component mount
    }, [dispatch]);

    const fetchTeamData = async () => {
        await dispatch(fetchTeams()); // Dispatch action to fetch teams
    };

    return (
        <div className="admin-dashboard">
            <header className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <div className="user-info">
                    <span>Welcome, {user?.username}</span> {/* Add safe access to user */}
                    <button>Logout</button>
                </div>
            </header>
            <div className="dashboard-content">
                <aside className="sidebar">
                    <nav>
                        <ul>
                            <li>Dashboard Overview</li>
                            <li>Manage Teams</li>
                            <li>User Management</li>
                            <li>Reports</li>
                            <li>Settings</li>
                            <li>User Profile</li>
                        </ul>
                    </nav>
                </aside>
                <main className="main-content">
                    <div className="overview-cards">
                        <div className="card">
                            <h3>Task for Evaluation of Software Development Internship from SkillMingle</h3>
                        </div>
                    </div>

                    <section className="activity-feed">
                        <TeamManagement />
                    </section>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
