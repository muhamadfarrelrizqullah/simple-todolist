const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const Todo = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

// Sinkronisasi model dengan database
sequelize.sync()
    .then(() => console.log('Database connected and synced'))
    .catch(err => console.error('Unable to connect to the database:', err));

// Tambah Todo
app.post('/add', (req, res) => {
    const {
        task
    } = req.body;
    if (!task) {
        return res.status(400).json({
            error: 'Task is required'
        });
    }

    Todo.create({
            task
        })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Ambil Semua Todo
app.get('/get', (req, res) => {
    Todo.findAll()
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Update Todo
app.put('/update/:id', (req, res) => {
    const {
        id
    } = req.params;

    Todo.update({
            done: true
        }, {
            where: {
                id
            }
        })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Hapus Todo
// Hapus Todo
app.delete('/delete/:id', (req, res) => {
    const {
        id
    } = req.params;

    Todo.destroy({
            where: {
                id
            }
        })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});


app.listen(3001, () => {
    console.log('Server is running..');
});