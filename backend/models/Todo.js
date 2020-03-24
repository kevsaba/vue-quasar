const mongoose = require('mongoose');

const {Schema} = mongoose;

const todoSchema = new Schema({
  title: {
    type: String,
  },
  todoState: {
    type: Boolean,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
