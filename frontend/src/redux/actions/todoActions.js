import { GET_TODOS, CREATE_TODO } from './actionTypes';
import axios from 'axios';

export const getTeamTodos = () => async (dispatch) => {
    try {
        const response = await axios.get('/api/todos'); // Adjust your API endpoint accordingly
        dispatch({ type: GET_TODOS, payload: response.data });
    } catch (error) {
        console.error("Error fetching todos:", error);
    }
};

export const createTodo = (todoData) => async (dispatch) => {
    try {
        const response = await axios.post('/api/todos', todoData);
        dispatch({ type: CREATE_TODO, payload: response.data });
    } catch (error) {
        console.error("Error creating todo:", error);
    }
};
