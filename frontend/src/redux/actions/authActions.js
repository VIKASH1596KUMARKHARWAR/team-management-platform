import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    
    LOGIN_REQUEST,
    LOADING, // Optional: Add a loading action type
} from './actionTypes'; 
import { loginUser as apiLoginUser, registerUser as apiRegisterUser } from '../../api/api'; 
import axios from 'axios';

// authActions.js

export const loginUser = (credentials) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', credentials); // Updated URL
        const { token, user } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        dispatch({ type: LOGIN_SUCCESS, payload: user });
        return Promise.resolve(user);
    } catch (error) {
        console.error('Login error:', error); // Log the entire error object
        const errorMessage = error.response
            ? error.response.data.message || 'Login failed'
            : 'Login failed due to a network error';

        dispatch({
            type: LOGIN_FAILURE,
            payload: errorMessage,
        });

        return Promise.reject(errorMessage); // Return the error message
    }
};



export const registerUser = (userData) => async (dispatch) => {
    dispatch({ type: LOADING }); // Set loading state to true

    try {
        const response = await apiRegisterUser(userData);
        
        dispatch({ type: REGISTER_SUCCESS });

        // Optional: Automatically log in the user after successful registration
        await dispatch(loginUser({ username: userData.username, password: userData.password }));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Registration error:", error.response?.data);
            dispatch({ type: REGISTER_FAILURE, payload: error.response?.data?.message || "Registration failed." });
        } else {
            console.error("Unexpected error:", error);
            dispatch({ type: REGISTER_FAILURE, payload: "Registration failed due to an unexpected error." });
        }
    }
};
