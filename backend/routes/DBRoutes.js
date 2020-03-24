const express = require('express');

const app = express.Router();
const repository = require('../repositories/TodoRepository');

// get all todo items in the db
app.get('/', (req, res) => {
    repository.findAll().then((todos) => {
        res.json(todos);
    }).catch((error) => console.log(error));
});

// add a todo item
app.post('/', (req, res) => {
    const {title} = req.body;
    repository.create(title).then((todo) => {
        res.json(todo);
    }).catch((error) => console.log(error));
});

// delete a todo item
app.delete('/:id', (req, res) => {
    const {id} = req.params;
    repository.deleteById(id).then((ok) => {
        res.status(200).json([]);
    }).catch((error) => console.log(error));
});

//delete all
app.delete('/', (req, res) => {
    repository.deleteAll()
        .then(res.status(200).json([]))
        .catch((error) => console.log(error));
});

// update a todo item
app.put('/:id', (req, res) => {
    const {id} = req.params;
    const todo = {title: req.body.title, todoState: req.body.todoState};
    repository.updateById(id, todo)
        .then(res.status(200).json([]))
        .catch((error) => console.log(error));
});
module.exports = app;
