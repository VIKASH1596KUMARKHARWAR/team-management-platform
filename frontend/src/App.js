import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import TeamDashboard from './components/TeamDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import TeamTodoList from './components/TodoList'; // Import the to-do list
import TeamDocuments from './components/TeamDocuments'; // Import the document upload page
import TeamTodos from './components/TeamTodos'; // Import the TeamTodos component
import './index.css';
import MemberTodos from './components/MemberTodos';
// import TeamMemberDashboard from './components/TeamMemberDashboard';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/team"
                        element={
                            <ProtectedRoute allowedRoles={['team_member', 'admin']}>
                                <TeamDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/user/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={['team_member']}>
                                <TeamDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/team/:teamId/todos" // Updated route
                        element={
                            <ProtectedRoute allowedRoles={['team_member']}>
                                <TeamTodos /> {/* Use the TeamTodos component here */}
                            </ProtectedRoute>
                        }
                    />
                                    <Route path="/member/:memberId/todos" element={<MemberTodos />} />

                    <Route
                        path="/team/:teamId/documents"
                        element={
                            <ProtectedRoute allowedRoles={['team_member']}>
                                <TeamDocuments />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
