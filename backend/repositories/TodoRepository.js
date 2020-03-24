const Todo = require('../models/Todo');

class TodoRepository {

    constructor(model) {
        this.model = model;
    }

    create(title) {
        const newTodo = {title, todoState: false};
        const todo = new this.model(newTodo);
        return todo.save();
    }

    findAll() {
        return this.model.find();
    }

    findById(id) {
        return this.model.findById(id);
    }

    deleteById(id) {
        return this.model.findByIdAndDelete(id);
    }

    deleteAll() {
        return this.model.deleteMany();
    }

    updateById(id, object) {
        const query = {_id: id};
        return this.model.findOneAndUpdate(query, {$set: {title: object.title, todoState: object.todoState}});
    }
}

module.exports = new TodoRepository(Todo);
