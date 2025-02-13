const app = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const server = app();

server.get('/', (req, res) => {
    res.send('Hello World');
    }
);

server.use(require('express').json());

let todos = [];

// Login endpoint
server.post('/login', (req, res) => {
    res.send('Login');
});

// Get all todos
server.get('/todos', (req, res) => {
    res.json(todos);
});

// Create a new todo
server.post('/todos', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Todo text is required' });
    }
    const newTodo = { id: Date.now(), text, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Update a todo (toggle completed status)
server.put('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id, 10);
    const todo = todos.find(t => t.id === todoId);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todo.completed = !todo.completed;
    res.json(todo);
});

// Delete a todo
server.delete('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id, 10);
    const index = todos.findIndex(t => t.id === todoId);
    if (index === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    const removed = todos.splice(index, 1);
    res.json({ message: 'Todo removed', todo: removed[0] });
});

server.listen(PORT, () => {
    console.log(`Server is running at => http://localhost:${PORT} 🤖`);
    }
);

