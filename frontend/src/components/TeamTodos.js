import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TeamTodos = () => {
    const { teamId } = useParams();
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/${teamId}/todos`);
                if (!response.ok) {
                    throw new Error('Failed to fetch todos');
                }
                const data = await response.json();
                setTodos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, [teamId]);

    const handleEditTodo = async (todoId) => {
        const currentTodo = todos.find(todo => todo._id === todoId);
        const newTitle = prompt("Edit todo title:", currentTodo.title);
        const newDescription = prompt("Edit todo description:", currentTodo.description);

        if (newTitle && newDescription) {
            try {
                const response = await fetch(`http://localhost:5000/api/${teamId}/todos/${todoId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: newTitle,
                        description: newDescription,
                        completed: currentTodo.completed // Preserve the current completed status
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to update todo');
                }

                const updatedTodo = await response.json();
                setTodos(prevTodos => prevTodos.map(todo => (todo._id === todoId ? updatedTodo : todo)));
                alert('Todo updated successfully!');
            } catch (error) {
                console.error('Error updating todo:', error);
                alert('Failed to update todo. Please try again.');
            }
        }
    };

    const handleToggleComplete = async (todoId) => {
        const currentTodo = todos.find(todo => todo._id === todoId);
        try {
            const response = await fetch(`http://localhost:5000/api/${teamId}/todos/${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...currentTodo,
                    completed: !currentTodo.completed // Toggle the completed status
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update todo');
            }

            const updatedTodo = await response.json();
            setTodos(prevTodos => prevTodos.map(todo => (todo._id === todoId ? updatedTodo : todo)));
            alert('Todo updated successfully!');
        } catch (error) {
            console.error('Error toggling todo completion:', error);
            alert('Failed to update todo. Please try again.');
        }
    };

    const handleDeleteTodo = async (todoId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this todo?');
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:5000/api/${teamId}/todos/${todoId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete todo');
                }

                setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoId));
                alert('Todo deleted successfully!');
            } catch (error) {
                console.error('Error deleting todo:', error);
                alert('Failed to delete todo. Please try again.');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="team-todos">
            <h2 className="team-title">Todos for Team {teamId}</h2>
            <ul className="todo-list">
                {todos.map(todo => (
                    <li key={todo._id} className="todo-item">
                        <h3 className="todo-title">{todo.title}</h3>
                        <p className="todo-description">{todo.description}</p>
                        <p className="todo-status">{todo.completed ? '✅ Completed' : '⏳ Pending'}</p>
                        <div className="todo-actions">
                            <button className="edit-button" onClick={() => handleEditTodo(todo._id)}>Edit</button>
                            <button className="complete-button" onClick={() => handleToggleComplete(todo._id)}>
                                {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                            </button>
                            <button className="delete-button" onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeamTodos;
