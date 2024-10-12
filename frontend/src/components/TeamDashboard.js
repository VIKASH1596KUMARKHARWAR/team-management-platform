// src/pages/TeamDashboard.js
import React from 'react';
// import TeamMemberDashboard from '../components/TeamMemberDashboard';
import TeamTodoList from './TodoList';
import TeamManagement from './TeamManagement';
import TodoList from './TodoList';

const TeamDashboard = () => {
    return (
        <div>
            <h1>Team Member Dashboard</h1>
            <TeamTodoList />
        </div>
    );
};

export default TeamDashboard;
