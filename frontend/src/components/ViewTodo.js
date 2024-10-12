import React, { useState } from 'react';

const ViewTodo = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [team, setTeam] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodoId, setCurrentTodoId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            // Update the todo
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === currentTodoId ? { ...todo, title, description, team } : todo
                )
            );
            resetForm();
        } else {
            // Create a new todo
            const newTodo = {
                id: Date.now(), // Use timestamp as a unique ID
                title,
                description,
                team,
                completed: false,
            };
            setTodos([...todos, newTodo]);
            resetForm();
        }
    };

    const handleDelete = (todoId) => {
        setTodos(todos.filter(todo => todo.id !== todoId));
    };

    const handleEdit = (todo) => {
        setIsEditing(true);
        setCurrentTodoId(todo.id);
        setTitle(todo.title);
        setDescription(todo.description);
        setTeam(todo.team || ''); // Set the selected team ID
    };

    const handleToggleComplete = (todoId) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setTeam('');
        setIsEditing(false);
        setCurrentTodoId(null);
    };

    return (
        <div>
            <h2>{isEditing ? 'Edit To-Do' : 'Create To-Do'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <select value={team} onChange={(e) => setTeam(e.target.value)}>
                    <option value="">No Team</option>
                    {/* Add some mock teams for demonstration */}
                    <option value="team1">Team 1</option>
                    <option value="team2">Team 2</option>
                </select>
                <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
                {isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
            </form>

            <h2>To-Do List</h2>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <h3>{todo.title}</h3>
                        <p>{todo.description}</p>
                        <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
                        {todo.team && <p>Team: {todo.team}</p>}
                        <button onClick={() => handleEdit(todo)}>Edit</button>
                        <button onClick={() => handleToggleComplete(todo.id)}>
                            {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                        </button>
                        <button onClick={() => handleDelete(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewTodo;
