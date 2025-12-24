// frontend/src/components/TodoList.js
import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL

function TodoList({ username, onLogout }) {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        fetchTodos();
    }, [username]); // Refetch when username changes (e.g., after login)

    // 1. READ: Fetch all todos for the current user
    const fetchTodos = async () => {
        try {
            const response = await fetch(`${API_URL}/todos/${username}`);
            
            if (!response.ok) {
                console.error('Failed to fetch todos:', response.statusText);
                return;
            }

            const data = await response.json();
            setTodos(data);
        } catch (err) {
            console.error('Error fetching todos:', err);
        }
    };

    // 2. CREATE: Add a new todo
    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        try {
            const response = await fetch(`${API_URL}/todos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, task: newTask }),
            });

            if (!response.ok) {
                console.error('Failed to add todo:', response.statusText);
                return;
            }

            const newTodo = await response.json();
            // Add the new item to the beginning of the list
            setTodos([newTodo, ...todos]); 
            setNewTask('');
        } catch (err) {
            console.error('Error adding todo:', err);
        }
    };

    // 3. UPDATE: Toggle the 'done' status
    const handleToggleDone = async (id, currentDoneStatus) => {
        const newDoneStatus = !currentDoneStatus;
        try {
            const response = await fetch(`${API_URL}/todos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ done: newDoneStatus }),
            });

            if (!response.ok) {
                console.error('Failed to update todo:', response.statusText);
                return;
            }

            // Update the status in the local state immediately
            setTodos(todos.map(todo => 
                todo.id === id ? { ...todo, done: newDoneStatus } : todo
            ));
        } catch (err) {
            console.error('Error toggling done status:', err);
        }
    };

    // 4. DELETE: Remove a todo item
    const handleDeleteTodo = async (id) => {
        try {
            const response = await fetch(`${API_URL}/todos/${id}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) {
                 console.error('Failed to delete todo:', response.statusText);
                return;
            }

            // Filter out the deleted item from the state
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (err) {
            console.error('Error deleting todo:', err);
        }
    };

    const handleLogout = () => {
        // Clear storage and trigger state change in App.js
        localStorage.removeItem('todo_username');
        onLogout();
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Todo List for: {username}</h2>
                <button onClick={handleLogout}>Logout</button>
            </div>
            
            <form onSubmit={handleAddTodo}>
                <input
                    type="text"
                    placeholder="Enter New Task here..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>

            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2">
                        {/* <input
                            type="checkbox"
                            checked={!!todo.done}
                            onChange={() => handleToggleDone(todo.id, todo.done)}
                            className="peer sr-only"
                        /> */}

                        <label className="flex cursor-pointer items-center gap-3">
                        <input
                            type="checkbox"
                            checked={!!todo.done}
                            onChange={() => handleToggleDone(todo.id, todo.done)}
                            className="peer sr-only"
                        />

                        <div className="
                            flex h-5 w-5 items-center justify-center
                            rounded-md border border-slate-300 bg-white
                            transition
                            peer-checked:border-emerald-500
                            peer-checked:bg-emerald-500
                        ">
                            <svg
                            className="h-3.5 w-3.5 text-white opacity-0 transition peer-checked:opacity-100"
                            viewBox="0 0 20 20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            >
                            <path d="M4 10l4 4 8-8" />
                            </svg>
                        </div>

                        <span
                            className={`text-sm ${
                            todo.done ? "text-slate-400 line-through" : "text-slate-800"
                            }`}
                        >
                            {todo.task}
                        </span>
                        </label>

                        <small> (Updated: {new Date(todo.updated).toLocaleString()})</small>
                        <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="text-xs text-red-500 hover:text-red-600"
                        >
                        Delete
                        </button>

                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;