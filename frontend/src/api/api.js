import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Update this based on your backend

// Create an instance of axios with the base URL
const api = axios.create({
    baseURL: API_URL,
});

// Intercept requests to add a token if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // or however you store the token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Export the api instance as the default export
export default api; // Ensure this line is present

// User Authentication
export const loginUser = (data) => api.post('/auth/login', data);
export const registerUser = (data) => api.post('/auth/register', data);

// Teams
export const createTeam = (data) => api.post('/teams', data);
export const getTeams = () => api.get('/teams');

// To-Dos
export const createTodo = (data) => api.post('/todos', data);
export const getTodos = () => api.get('/todos'); // Fetch all todos
export const updateTodo = (id, data) => api.put(`/todos/${id}`, data); // Update a specific todo
export const deleteTodo = (id) => api.delete(`/todos/${id}`); // Delete a specific todo


//
