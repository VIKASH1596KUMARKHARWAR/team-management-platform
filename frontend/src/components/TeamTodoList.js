import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeamTodoList = ({ teamId }) => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/${teamId}/todos`);
                setTodos(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, [teamId]);

    const handleAddTodo = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/${teamId}/todos`, { title: newTodo });
            setTodos([...todos, response.data]);
            setNewTodo('');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteTodo = async (todoId) => {
        try {
            await axios.delete(`http://localhost:5000/api/${teamId}/todos/${todoId}`);
            setTodos(todos.filter(todo => todo._id !== todoId));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading to-dos...</p>;
    if (error) return <p>Error fetching to-dos: {error}</p>;

    return (
        <div>
            <h2>To-Do List for Team</h2>
            <input 
                type="text" 
                value={newTodo} 
                onChange={(e) => setNewTodo(e.target.value)} 
                placeholder="Add a new to-do"
            />
            <button onClick={handleAddTodo}>Add</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo._id}>
                        {todo.title} <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeamTodoList;
