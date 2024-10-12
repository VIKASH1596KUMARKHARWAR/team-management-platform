// src/redux/actions/teamActions.js
import {
    GET_TEAMS,
    CREATE_TEAM,
    DELETE_TEAM,
    ERROR,
    LOADING,
    
} from './actionTypes';// Adjust the path based on your file structure

import axios from 'axios'; // Using axios for API calls

import { getTeams as apiGetTeams } from '../../api/api'; // Import the API functions
import api from '../../api/api'; // Ensure you import the api instance from where it is defined

// Fetch teams from the API
export const fetchTeams = () => async (dispatch) => {
    dispatch({ type: LOADING }); // Set loading to true before making the request
    try {
        const response = await apiGetTeams(); // Use the imported function
        dispatch({ type: GET_TEAMS, payload: response.data });
    } catch (error) {
        console.error("Error fetching teams:", error);
        dispatch({ type: ERROR, payload: error.message }); // Dispatch error action
    }
};

// Create a new team
export const createNewTeam = (teamData) => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
        const response = await api.post('/teams', teamData);
        dispatch({ type: CREATE_TEAM, payload: response.data });
        return response.data; // Return the newly created team data
    } catch (error) {
        console.error("Error creating team:", error.response ? error.response.data : error.message);
        dispatch({ type: ERROR, payload: error.message });
        return null;
    }
};

// Delete a team by ID
export const deleteTeam = (teamId) => async (dispatch) => {
    try {
        await api.delete(`/teams/${teamId}`); // Call the API to delete the team
        dispatch({ type: DELETE_TEAM, payload: teamId }); // Dispatch the delete action to update the state
    } catch (error) {
        console.error("Error deleting team:", error.response ? error.response.data : error.message);
        dispatch({ type: ERROR, payload: error.message }); // Handle error by dispatching an error action
    }
};

// Add a member to a team
export const fetchTeamsAll = () => async (dispatch) => {
    dispatch({ type: LOADING });
    try {
        const response = await api.get('/teams'); // Ensure this endpoint returns teams with members
        dispatch({ type: GET_TEAMS, payload: response.data });
    } catch (error) {
        console.error("Error fetching teams:", error);
        dispatch({ type: ERROR, payload: error.message });
    }
};