import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import TeamDashboard from './components/TeamDashboard';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/team" element={<TeamDashboard />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
